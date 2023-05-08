<script>	
	import Modal from "../Modal.svelte";

	import {modalShown,modalPage} from "../stores.js";
</script>

<Modal on:close={() => {$modalShown = false}}>
    <h2 slot="header">Everything new in BetterMeower 1.5.0</h2>
    <div slot="default">
        BetterMeower 1.5.0 is here with lots of new features and updates! Starting off with the refreshed new design, search functionality, custom themes, webhooks, and changes to our login screen, there's no shortage of features not to love!
        <br>
        <img alt="A screenshot of the BetterMeower 1.5.0 interface" src="src/assets/public/1-5-0-updates.png" />
        <hr>
        <div class="modal-buttons">
            <button on:click={() => {
                $modalShown = false;
                localStorage.setItem("1-5-0-updates-dev", "seen");
                console.log("News modal closed")
            }}>Cool!</button>
             <button on:click={() => {
                window.open("https://blog.bettermeower.app/2022/12/22/everything-new-in-1-5-0.html", "_blank");
                console.log("Blog post opened via News modal")
            }}>Learn More</button>
        </div>
	</div>
</Modal>

<style>
	.small {
		font-size: 12px;
	}
</style>