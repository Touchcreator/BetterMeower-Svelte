<script>	
	import Modal from "../Modal.svelte";

	import {modalShown,modalPage} from "../stores.js";
    import {i18n_config} from "../i18n.js";
</script>

<Modal on:close={() => {$modalShown = false}}>
    <h2 slot="header">Change Language</h2>
    <div slot="default">
		<button class="long" on:click={() => {
            localStorage.setItem("language", "en");
            i18n_config("en");
            $modalShown = false;
        }}>English</button>
        <br>
        <button class="long" on:click={() => {
            localStorage.setItem("language", "fr");
            i18n_config("fr");
            $modalShown = false;
        }}>Français</button>
        <br>
        <button class="long" on:click={() => {
            localStorage.setItem("language", "ig");
            i18n_config("ig");
            $modalShown = false;
        }}>Igbo</button>
	</div> 
</Modal>

<style>
	.smol {
		font-size: 8px;
	}

    .long {
        width: 100%;
    }
</style>
