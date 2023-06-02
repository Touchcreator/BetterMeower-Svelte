<script>
	import PostList from "./PostList.svelte";
	import FormattedDate from "./FormattedDate.svelte";
	import * as clm from "./clmanager.js";
	import {levels} from "./formatting.js";
	import {
		mainPage as page,
		modalPage,
		modalShown,
		announcementToSend,
		profileClicked,
		user,
	} from "./stores";
	import Container from "./Container.svelte";
    import { tick } from "svelte/internal";

	let ipData = null;
	let infoMsg = "";
	let alertMsg = "";
	let actionMsg = "";
	// let announceMsg = "";
	let displayedUserCount = 10;
	let showAllUsers = false;


	let actionType = "kick";

	const modTypes = [
		{
			cmd: "kick",
			name: "Kick",
			description: "Disconnects the user, while still allowing them to log back in.",
			level: 1,
		},
		{
			cmd: "clear_user_posts",
			name: "Delete all posts (Permanent)",
			description: "Delete all of the user's posts that were made in home. This action is permanent and cannot be undone.",
			level: 1,
		},
		{
			cmd: "ban",
			name: "Ban",
			description:
				"Disconnects the user and bans them, preventing them from logging back in.",
			level: 1,
		},
		{
			cmd: "pardon",
			name: "Unban",
			description: "Unbans the user, allowing them to log back in.",
			level: 1,
		},
		{
			cmd: "block",
			name: "Ban IP",
			description:
				"Bans the specified IP address, preventing use of the IP address for creating accounts and logging in.",
			level: 2,
		},
		{
			cmd: "unblock",
			name: "Unban IP",
			description: "Unbans the specified IP address, allowing use of the IP address for creating accounts and logging in.",
			level: 2,
		},
		{
			cmd: "terminate",
			name: "Terminate (Permanent)",
			description: "Bans the user, preventing them from logging back in, and deletes all of their posts.",
			level: 3,
		},
	];

	async function gotoProfile(username) {
		page.set("");
		await tick();
		profileClicked.set(username);
		page.set("profile");
	}

	let items = [];
</script>

<div class="ModPanel">
    {#if $user.lvl < 1}
		<h2>Hey! It appears that you aren't a moderator :(</h2>
		<h3>Only moderators can access the Moderation Panel. If you were recently promoted to moderator status, you may need to refresh the page.</h3>
		<i><b>Still not working?</b> Hold down Shift while clicking the refresh button to clear BetterMeower's cache, and if it still isn't working, contact someone in the Meower Council.</i>
	{:else}
	<h3>Get User Info</h3>
	<form
		on:submit|preventDefault={async e => {
			/** @type {HTMLFormElement} */
			// @ts-ignore
			const f = e.target;
			// @ts-ignore
			const username = f.elements[0].value;

			const isL2 = $user.lvl >= 2;

			const isIP = username.includes(".") || username.includes(":");

			if (!username) {
				infoMsg = "You need to enter a username or IP!";
				return;
			}

			ipData = null;

			try {
				infoMsg = "Submitting...";
				let _ipData = {};
				let ip = username;
				if (isL2) {
					if (!isIP) {
						ip = (
							await clm.meowerRequest({
								cmd: "direct",
								val: {
									cmd: "get_user_ip",
									val: username,
								},
							})
						).payload.ip;
					}
					_ipData = (
						await clm.meowerRequest({
							cmd: "direct",
							val: {
								cmd: "get_ip_data",
								val: ip,
							},
						})
					).payload;
				}
				_ipData.user = (
					await clm.meowerRequest({
						cmd: "direct",
						val: {
							cmd: "get_user_data",
							val: isIP && isL2 ? _ipData.last_user : username,
						},
					})
				
				).payload;
				ipData = _ipData;
				infoMsg = "";
			} catch (e) {
				console.error(e);
				infoMsg = "Error: " + e;
			}
		}}
	>
		<div class="input-row">
			<input
				class="grow white"
				type="text"
				placeholder="Username/IP..."
			/>
			<button class="static">Submit</button>
		</div>
		{#if infoMsg}
			<div class="msg">{infoMsg}</div>
		{/if}
	</form>
	{#if ipData}
		<div class="ip-info">
			{#if $user.lvl < 2}<b>Just so you know,</b> only level 2 moderators (and above) can access IP info!
					<br />{/if}
			<br>
			<b>Username:</b>
			<a
				href="/"
				on:click|preventDefault={() =>
					gotoProfile(ipData.user.username)}>{ipData.user.username}</a
			><br />
			<b>Quote:</b>
			<i>"{ipData.user.quote}"</i><br />
			<b>Created:</b>
			<FormattedDate date={ipData.user.created} /><br />
			<b>Level:</b>
			{ipData.user.lvl} - {levels[ipData.user.lvl] || "Unknown"}<br />
			<b>Banned?</b>
			{ipData.user.banned ? "Yes" : "No"}<br />
			{#if $user.lvl >= 2}
				<b>IP:</b>
				{ipData.ip}<br />
				<b>IP banned?</b>
				{ipData.banned ? "Yes" : "No"}<br />
				<b>Last user on IP:</b>
				<a
					href="/"
					on:click|preventDefault={() =>
						gotoProfile(ipData.last_user)}>{ipData.last_user}</a
				><br />
				<b>Users on IP:</b>
				<ul>
					{#each ipData.users as username}
						<li>
							<a
								href="/"
								on:click|preventDefault={() =>
									gotoProfile(username)}>{username}</a
							>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
	<br>
	<h3>Send Alert</h3>
	<form
		on:submit|preventDefault={async e => {
			/** @type {HTMLFormElement} */
			// @ts-ignore
			const f = e.target;
			// @ts-ignore
			const user = f.elements[0].value;
			// @ts-ignore
			const text = f.elements[2].value;

			if (!user || !text) {
				alertMsg = "You need to enter a username and an alert message!";
				return;
			}
			try {
				actionMsg = "Sending...";
				await clm.meowerRequest({
					cmd: "direct",
					val: {
						cmd: "alert",
						val: {
							username: user,
							p: text,
						},
					},
				});
				items = items.filter(p => p._id !== user);
				alertMsg = "Alert sent!";
			} catch (e) {
				console.error(e);
				alertMsg = "Error: " + e;
			}
		}}
	>
		<div class="input-row">
			<input class="grow white" type="text" placeholder="Username..." />
			<button class="static">Send</button>
		</div>
		<textarea
			class="alert-textarea white"
			placeholder="Enter your alert message here..."
		/>
		{#if alertMsg}
			<div class="msg">{alertMsg}</div>
		{/if}
	</form>
	{#if $user.lvl > 3}
	<br>
	<h3>Send Announcement</h3>
	<!--<form
		on:submit|preventDefault={async e => {
			/** @type {HTMLFormElement} */
			// @ts-ignore
			const f = e.target;
			// @ts-ignore
			const text = f.elements[0].value;

			if (!text) {
				announceMsg = "You need to enter some text!";
				return;
			}
			announceMsg = "";
			$announcementToSend = text;
			$modalPage = "announce";
			$modalShown = true;
		}}
	>
		<textarea
			class="announce-textarea white"
			placeholder="Announcement text here..."
		/>
		<div class="announce-buttons">
			<button class="align-right">Send</button>
			{#if announceMsg}
				<div class="msg">{announceMsg}</div>
			{/if}
		</div>
	</form> -->
	<p>Sorry, making announcements is currently broken on BetterMeower. We're planning on fixing this soon!</p>
	{/if}
	<br>
	<h3>Moderate User</h3>
	<form
		on:submit|preventDefault={async e => {
			/** @type {HTMLFormElement} */
			// @ts-ignore
			const f = e.target;
			// @ts-ignore
			const user = f.elements[0].value;
			// @ts-ignore
			const type = f.elements[1].value;

			if (!user) {
				actionMsg = "You need to enter a username!";
				return;
			}
			try {
				actionMsg = "Doing it...";
				await clm.meowerRequest({
					cmd: "direct",
					val: {
						cmd: type,
						val: user,
					},
				});
				items = items.filter(p => p._id !== user);
				actionMsg = "Action done!";
			} catch (e) {
				console.error(e);
				actionMsg = "Error: " + e;
			}
		}}
	>
		<div class="input-row wrap">
			<input
				class="grow white moderate-user-input"
				type="text"
				placeholder={["block", "unblock"].includes(actionType)
					? "IP address..."
					: "Username..."}
			/>
			<div class="input-row grow">
				<select
					class="grow"
					on:change={e => {
						// @ts-ignore
						actionType = e.target.value;
					}}
				>
					{#each modTypes as a}
						<option
							disabled={a.level > $user.lvl}
							selected={a.cmd === "kick"}
							value={a.cmd}>{a.name}</option
						>
					{/each}
				</select>
				<button class="static">Do it!</button>
			</div>
		</div>
		{#if actionType}<p>
				{(modTypes.find(o => o.cmd == actionType) || {}).description ||
					"Could not get description."}
			</p>{/if}
		{#if actionType === "block"}
			<p>
				<b>Hey, just so you know,</b> banning users through IP isn't very secure in CL3. Instead, we recommend contacting someone with access to the Meower Cloudflare who can WAF ban them.
			</p>
		{/if}
		{#if actionType === "unblock"}
			<p>
				<b>Hey, just so you know,</b> when unbanning IP addresses in CL3, you should also contact someone with access to the Meower Cloudflare who can also revoke any WAF bans.
			</p>
		{/if}
		{#if actionMsg}
			<div class="msg">{actionMsg}</div>
		{/if}
	</form>
	<br>
	<h3>Reports</h3>
	<PostList bind:items fetchUrl="reports" postOrigin="" canPost={false}>
		<div slot="error" let:error>
			Oops! Couldn't load the report queue. Try reloading the moderation panel.
			<i>Error occured: <pre><code>{error}</code></pre></i>
		</div>
		<div slot="empty">Yay, the report queue is empty!</div>
	</PostList>

	{/if}
</div>
<style>
	h2 {
		margin-top: 0.5em;
	}

	.alert-textarea {
		display: block;
		margin-top: 0.5em;
		resize: vertical;
		width: 100%;
	}

	.announce-textarea {
		display: block;
		margin-bottom: 0.25em;
		resize: vertical;
		width: 100%;
	}
	.input-row {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		gap: 0.25em;
		justify-content: stretch;
	}
	.wrap {
		flex-wrap: wrap;
	}
	.grow {
		flex-grow: 1;
		flex-shrink: 1;
	}
	.static {
		flex-grow: 0;
		flex-shrink: 0;
	}

	.msg {
		display: block;
		font-size: 75%;
		font-weight: bold;
		margin: 0.25em 0;
	}

	.ip-info {
		margin: 0.5em 0;
	}

	.moderate-user-input {
		flex-basis: 15em;
	}

	.announce-buttons {
		min-height: 2em;
	}

	.align-right {
		float: right;
	}
</style>