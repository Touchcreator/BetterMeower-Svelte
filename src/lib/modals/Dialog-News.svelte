<script>	
	import Modal from "../Modal.svelte";

	import {modalShown,modalPage,DialogTitle,DialogText,NewsDialogLink,NewsDialoglsvarname} from "../stores.js";
</script>

<Modal on:close={() => {$modalShown = false}}>
    <h2 slot="header">{$DialogTitle}</h2>
    <div slot="default">
		<p>{$DialogText}</p>
        <button on:click={() => {
            $modalShown = false;
			localStorage.setItem($NewsDialoglsvarname, "seen");
        }}>Cool</button>
		<button on:click={() => {
            window.open($NewsDialogLink, "_blank");
        }}>Learn More</button>
	</div>
</Modal>

<style>
	.small {
		font-size: 8px;
	}
</style>
