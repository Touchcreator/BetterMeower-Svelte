<script>	
    import { shiftHeld } from "../keyDetect.js";
    import { Hide } from "../Modal.js";
	import Modal from "../Modal.svelte";

	import {modalShown,modalPage,chatName,chatMembers,chatOwner,chatid,ulist,postClicked,profileClicked,search_mode,search_q,profileClicked_GC,spinner} from "../stores.js";
</script>

<Modal on:close={() => {$modalShown = false}}>
    <h2 slot="header">Change store(global) Vars</h2>
    <div slot="default">
		These ARENT ALL THE STORES
        <form 
		class="createpost"
		autocomplete="off"
		on:submit|preventDefault={async e => {	
			chatName.set(e.target[0].value)
            chatMembers.set(JSON.parse(e.target[1].value))
            chatid.set(e.target[2].value)
            chatOwner.set(e.target[3].value)
            ulist.set(JSON.parse(e.target[4].value))
            postClicked.set(JSON.parse(e.target[5].value))
            profileClicked.set(e.target[6].value)
            search_mode.set(e.target[7].value)
            search_q.set(e.target[8].value)
            profileClicked_GC.set(e.target[9].value)
            spinner.set(e.target[10].value == "true" && true || false)

            Hide()
		}}
	>
		<input
			type="text"
			class="white"
			placeholder="Chat Name"
			autocomplete="false"
			on:keydown={(event) => {
				if (event.key == "Enter" && !shiftHeld) {
					event.preventDefault();
					document.getElementById("submitpost_st").click();
				}
			}}
		>
        <input
			type="text"
			class="white"
			placeholder="Chat Members"
			autocomplete="false"
			on:keydown={(event) => {
				if (event.key == "Enter" && !shiftHeld) {
					event.preventDefault();
					document.getElementById("submitpost_st").click();
				}
			}}
		>
        <input
			type="text"
			class="white"
			placeholder="Chat ID"
			autocomplete="false"
			on:keydown={(event) => {
				if (event.key == "Enter" && !shiftHeld) {
					event.preventDefault();
					document.getElementById("submitpost_st").click();
				}
			}}
		>
        <input
			type="text"
			class="white"
			placeholder="Chat Owner"
			autocomplete="false"
			on:keydown={(event) => {
				if (event.key == "Enter" && !shiftHeld) {
					event.preventDefault();
					document.getElementById("submitpost_st").click();
				}
			}}
		>
        <input
			type="text"
			class="white"
			placeholder="Ulist"
			autocomplete="false"
			on:keydown={(event) => {
				if (event.key == "Enter" && !shiftHeld) {
					event.preventDefault();
					document.getElementById("submitpost_st").click();
				}
			}}
		>
        <input
			type="text"
			class="white"
			placeholder="Post Clicked"
			autocomplete="false"
			on:keydown={(event) => {
				if (event.key == "Enter" && !shiftHeld) {
					event.preventDefault();
					document.getElementById("submitpost_st").click();
				}
			}}
		>
        <input
			type="text"
			class="white"
			placeholder="Profile Clicked"
			autocomplete="false"
			on:keydown={(event) => {
				if (event.key == "Enter" && !shiftHeld) {
					event.preventDefault();
					document.getElementById("submitpost_st").click();
				}
			}}
		>
        <input
			type="text"
			class="white"
			placeholder="Search Mode"
			autocomplete="false"
			on:keydown={(event) => {
				if (event.key == "Enter" && !shiftHeld) {
					event.preventDefault();
					document.getElementById("submitpost_st").click();
				}
			}}
		>
        <input
			type="text"
			class="white"
			placeholder="Search Query"
			autocomplete="false"
			on:keydown={(event) => {
				if (event.key == "Enter" && !shiftHeld) {
					event.preventDefault();
					document.getElementById("submitpost_st").click();
				}
			}}
		>
        <input
			type="text"
			class="white"
			placeholder="Gc profile clicked"
			autocomplete="false"
			on:keydown={(event) => {
				if (event.key == "Enter" && !shiftHeld) {
					event.preventDefault();
					document.getElementById("submitpost_st").click();
				}
			}}
		>
        <input
			type="text"
			class="white"
			placeholder="Spinner"
			autocomplete="false"
			on:keydown={(event) => {
				if (event.key == "Enter" && !shiftHeld) {
					event.preventDefault();
					document.getElementById("submitpost_st").click();
				}
			}}
		>

		<button id="submitpost_st">Set!</button>
	</form>
	</div>
</Modal>

<style>
	.smol {
		font-size: 8px;
	}
</style>
