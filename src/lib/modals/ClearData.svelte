<script>	
	import Modal from "../Modal.svelte";

	import {
		setupPage,
		screen,
		modalShown,
		disconnectReason,
        disconnected
	} from "../stores.js";

	import {tick} from "svelte";
</script>

<Modal on:close={() => {$modalShown = false}}>
    <h2 slot="header">Clear Local Data</h2>
    <div slot="default">
		<span>Are you sure you would like to clear local data?</span>
		<span>This should only be used if you are having issues with BetterMeower.</span>
		<br /><br />
		<span><b>This will remove saved logins!</b></span>
		<br /><br />
		<div class="modal-buttons">
			<button on:click={() => {
				$modalShown = false;
			}}>Cancel</button>
			<button on:click={async () => {
				$modalShown = false;
				window.localStorage.clear();
			}}>Clear</button>
		</div>
	</div>
</Modal>