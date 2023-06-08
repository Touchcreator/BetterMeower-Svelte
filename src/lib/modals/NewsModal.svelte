<script>	
	import Modal from "../Modal.svelte";

	import {modalShown,modalPage} from "../stores.js";
</script>

<Modal on:close={() => {$modalShown = false}}>
    <h2 slot="header">Introducing: BetterMeower Classic</h2>
    <div slot="default">
        <p>Welcome to BetterMeower Classic! We're taking the Svelte version of BetterMeower you're used to and making it even better. If you want to learn more about BetterMeower Classic, click the learn more button below!</p>
        <hr>
        <div class="modal-buttons">
            <button on:click={() => {
                $modalShown = false;
                localStorage.setItem("classic-release", "seen");
                console.log("News modal closed")
            }}>Cool!</button>
             <button on:click={() => {
                window.open("https://blog.bettermeower.app/2023/06/03/bettermeower-classic-features.html", "_blank");
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