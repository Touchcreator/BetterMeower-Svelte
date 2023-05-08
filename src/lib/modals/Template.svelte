<script>	
	import Modal from "../Modal.svelte";

	import {modalShown,modalPage} from "../stores.js";
</script>

<Modal on:close={() => {$modalShown = false}}>
    <h2 slot="header">Title</h2>
    <div slot="default">
		Text
        <div class="smol">small text</div>
	</div>
</Modal>

<style>
	.smol {
		font-size: 8px;
	}
</style>
