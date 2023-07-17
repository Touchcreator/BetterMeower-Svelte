<script>	
	import Modal from "../Modal.svelte";

	import {modalShown,modalPage} from "../stores.js";
    import {i18n_config} from "../i18n.js";
</script>

<Modal on:close={() => {$modalShown = false}}>
    <h2 slot="header">Change Language</h2>
    <div slot="default">
		<button class="long" on:click={() => {
            i18n_config("en");
        }}>English</button>
        <button class="long" on:click={() => {
            i18n_config("fr");
        }}>Français</button>
        <div class="smol">Don't see your language here? Contribute it to BetterMeower!</div>
	</div>
</Modal>

<style>
	.smol {
		font-size: 8px;
	}
</style>
