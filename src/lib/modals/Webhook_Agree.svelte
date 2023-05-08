<script>	
	import Modal from "../Modal.svelte";

	import {modalShown,modalPage} from "../stores.js";
</script>

<Modal on:close={() => {$modalShown = false}}>
    <h2 slot="header">Guest Posting</h2>
    <div slot="default">
        Guest posts are provided by a third-party service, Webhooks. By continuing, you agree that you are not breaking any
        Meower rules, terms of service or content policies. Your IP address may be shared for moderation purposes only.
        <hr>
        Click "I Agree" to enable guest posting.
        <hr>
        <div class="modal-buttons">
            <button on:click={() => {
                $modalShown = false;
                localStorage.setItem("webhooksAgree", "true");
                console.log("User agreed to Webhooks terms of service")
            }}>I Agree</button>
            <button on:click={() => {
                $modalShown = false;
                console.log("User disagreed to Webhooks terms of service")
            }}>I Disagree</button>
        </div>
	</div>
</Modal>

<style>
	.small {
		font-size: 8px;
	}
</style>