<script>	
	import Modal from "../Modal.svelte";

	import {modalShown,modalPage} from "../stores.js";
</script>

<Modal on:close={() => {$modalShown = false}}>
    <h2 slot="header">Error Loading Modal</h2>
    <div slot="default">
		<p>{"Error loading modal for '" + $modalPage + "'"}</p>
		<small class="smol">PS to devlopers, Your code may be working!</small>
		<script>console.error("User opened a modal that does not exist");</script>
	</div>
</Modal>

<style>
	.smol {
		font-size: 8px;
	}
</style>
