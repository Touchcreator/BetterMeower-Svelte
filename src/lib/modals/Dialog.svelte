<script>	
	import Modal from "../Modal.svelte";

	import {modalShown,modalPage,DialogTitle,DialogText} from "../stores.js";
</script>

<Modal on:close={() => {$modalShown = false}}>
    <h2 slot="header">{$DialogTitle}</h2>
    <div slot="default">
		<p>{$DialogText}</p>
        <button on:click={() => {
            $modalShown = false;
        }}>Close</button>
	</div>
</Modal>

<style>
	.small {
		font-size: 8px;
	}
</style>
