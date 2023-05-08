<script>	
	import Modal from "../Modal.svelte";

	import {modalShown,modalPage} from "../stores.js";
</script>

<Modal on:close={() => {$modalShown = false}}>
    <h2 slot="header">Custom Theme</h2>
    <div slot="default">
        Main color <input type="color" name="Main Color" value="#f9a636"> (Orange Main)
        <br>
        Light Highlights <input type="color" name="Highlight 1" value="#ffce8c"> (Orange Light)
        <br>
        Dark Highlights <input type="color" name="Highlight 2" value="#b46d34"> (Orange Dark)
        <br>
        Background color <input type="color" name="Bg" value="#ffce8c"> (Background)
        <br>
        Foreground color <input type="color" name="Fg" value="#ffce8c"> (Foreground)
        <br>
        Foreground Backing <input type="color" name="Foreground Backing" value="#ffce8c"> (Orange Foreground)
        <!--color: hex colors, ; seperates hex colors.-->
		<hr>
		<div class="modal-buttons" style="grid-column-start: 1;">
            <button on:click={() => {
                $modalShown = false;
            }}>Close</button>
        </div>
	</div>
</Modal>

<style>
	.small {
		font-size: 8px;
	}
</style>
