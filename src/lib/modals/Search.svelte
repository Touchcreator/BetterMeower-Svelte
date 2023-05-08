<script>	
    import Modal from "../Modal.svelte";
    import {Hide} from "../Modal.js"

	import {modalShown,modalPage,search_mode,search_q,mainPage as page} from "../stores.js";

    let us = false
    if ($search_mode == "users") {
        us = true
    }

    async function search() {
        Hide()
        if (us) {
            search_q.set(username)
            page.set("searchres_U");
        } else {
            search_q.set(username)
            page.set("searchres_P");
        }
    }

    let username = ""
</script>

<Modal on:close={() => {$modalShown = false}}>
    <h2 slot="header">Search {us && "Users" || "Posts"}</h2>
    <div slot="default">
        {#if us}
            <form
                on:submit|preventDefault={e => {					
                search()
                }}
            >
                <label for="userinput"><b>Username</b></label>
                <input
                    type="text"
                    class="long white"
                    placeholder="Username"

                    id="userinput"
                    name="userinput"

                    autocomplete="false"
                    maxlength="360"

                    bind:value={username}
                >
                <br><br>
                <div class="modal-buttons">
                    <button type="button" on:click|preventDefault={() => {
                        $modalShown = false;
                    }}>Cancel</button>
                    <button type="submit" disabled={!username}>Search</button>
                </div>
            </form>
        {:else}
            <form
                on:submit|preventDefault={e => {					
                search()
                }}
            >
                <label for="userinput"><b>Post</b></label>
                <input
                    type="text"
                    class="long white"
                    placeholder="Post"

                    id="userinput"
                    name="userinput"

                    autocomplete="false"
                    maxlength="360"

                    bind:value={username}
                >
                <br><br>
                <div class="modal-buttons">
                    <button type="button" on:click|preventDefault={() => {
                        $modalShown = false;
                    }}>Cancel</button>
                    <button type="submit" disabled={!username}>Search</button>
                </div>
            </form>
        {/if}
	</div>
</Modal>

<style>
    .long {
        width: 100%;
        margin: 0;
		margin-bottom: -2px;
    }
</style>
