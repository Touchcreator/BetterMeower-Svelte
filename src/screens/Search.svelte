<script>
    import {mainPage as page, modalShown,modalPage, profileClicked,search_mode} from "../lib/stores.js";
    import Container from "../lib/Container.svelte";
    import { shiftHeld } from "../lib/keyDetect.js";
    import {apiUrl, encodeApiURLParams} from "../lib/urls.js";
    import {Show} from "../lib/Modal.js"
</script>

<div class="Search">
    <Container>
        <h1>Search</h1>
        Search Meower for posts, users, and stats.
    </Container>
    <Container>
        <div class="settings-controls">
            <button
                class="circle search"
                on:click={() => {
                    search_mode.set("users")
                    Show("Search")
                }}
            ></button>
        </div>

        <h1>Search Users</h1>
        Find all the legit users, memes and namesnipes.
    </Container>
    <Container>
        <div class="settings-controls">
            <button
                class="circle search"
                on:click={() => {
                    search_mode.set("posts")
                    Show("Search")
                }}
            ></button>
        </div>

        <h1>Search Posts</h1>
        <s>Find posts and maybe even relics.</s> <b>Searching for posts is currently disabled for server maintenence.</b>
    </Container>
    <Container>
        <div class="settings-controls">
            <!-- <button
                class="circle search"
                on:click = {()=>{
                    modalPage.set("Stats");
					modalShown.set(true);
                }}
            ></button> -->
        </div>

        <h1>Stats</h1>
        The amount of things on Meower!
    </Container>
    <Container>
        <h1>Go to User</h1>
        <form 
            class="createpost"
            autocomplete="off"
            on:submit|preventDefault={e => {	
                profileClicked.set(e.target[0].value)
                page.set("profile")
            }}
        >
            <!--TODO: Check if user exists-->
            <p>Go to a specific user!</p>
            <input
                type="text"
                class="white"
                placeholder="Type a username..."
                name="gtuser"
                autocomplete="false"
                on:keydown={(event) => {
                    if (event.key == "Enter" && !shiftHeld) {
                        event.preventDefault();
                        document.getElementById("submitpost").click();
                    }
                }}
            >
            <button id="submitpost">Go to user</button>
        </form>
    </Container>
</div>

<style>
    .settings-controls {
		position: absolute;
		top: 0.25em;
		right: 0.25em;
	}
</style>