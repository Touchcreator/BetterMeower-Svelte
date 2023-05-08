<script>
    import Container from "../lib/Container.svelte";
    import Loading from "../lib/Loading.svelte";
    import {apiUrl, encodeApiURLParams} from "../lib/urls.js";
    import Post from "../lib/Post.svelte";

    import {fly} from "svelte/transition";
	import {flip} from 'svelte/animate';
    import {search_q} from "../lib/stores.js";

    let pageLoading = false

    let results = []
    let id = 0

    let numPages = 0
    let pagesLoaded = 0
    let resOffset = 0

    async function loadUserResults(page, query) {
        pageLoading = true;
        if (page === undefined) {
            results = [];
        } else {
            // 25 posts per page...
            let realPage = page + Math.floor(resOffset / 25);
            let realOffset = resOffset % 25;

            try {
                let path = `search/home?autoget&page=`;
                let q = `&q=`
                if (encodeApiURLParams) path = encodeURIComponent(path);
                if (encodeApiURLParams) query = encodeURIComponent(query);
                const resp = await fetch(
                    `${apiUrl}${path}${realPage}${q}${query}`
                );
                if (!resp.ok) {
                    throw new Error("Response code is not OK; code is " + resp.status);
                }
                const json = await resp.json();

                let realPosts = json.autoget;
                realPosts.splice(0, realOffset);

                numPages = json.pages;

                let overflowResp, overflowJson;
                if (realOffset > 0 && pagesLoaded < numPages) {
                    overflowResp = await fetch(
                        `${apiUrl}${path}${realPage+1}`
                    );
                    if (!resp.ok) {
                        throw new Error("Overflow response code is not OK; code is " + resp.status);
                    }
                    overflowJson = await overflowResp.json();

                    realPosts = realPosts.concat(
                        overflowJson.autoget.slice(
                            0, realOffset
                        )
                    );
                }

                for (const res of realPosts) {
                    results.push({
						id: id++,
						post_id: res.post_id,
						user: res.u,
						content: res.p,
						date: res.t.e,
					});
                }
                pagesLoaded = page;
            } catch(e) {
                pageLoading = false;
                throw e;
            }
        }
        results = results;
        pageLoading = false;
        return results;
    }
</script>

<div class="SearchResults_P">
    <div class="center">
        {#await loadUserResults(1,$search_q)}
            <div class="fullcenter">
                <Loading />
            </div>
        {:then}
            <Container>
                <h1>Search Posts</h1>
                
                Query: {$search_q}
            </Container>
            {#if results.length < 1}
                No results!
            {:else}
                {#each results as post (post.id)}
                    <div
                        transition:fly|local="{{y: -50, duration: 250}}"
                        animate:flip="{{duration: 250}}"
                    >
                        <Post post={post} input={$search_q} />
                    </div>
                {/each}
            {/if}
            <div class="center">
                {#if pageLoading}
                    <Loading />
                {:else}
                    {#if numPages && numPages > pagesLoaded}
                        <button 
                            class="load-more"
                            on:click={() => loadUserResults(pagesLoaded + 1,$search_q)}
                        >
                            Load More
                        </button>
                    {/if}
                {/if}
            </div>
        {:catch error}
            <Container>
                <h1>Search Posts</h1>
                Error loading posts. Please try again.
                <pre><code>{error}</code></pre>
            </Container>
        {/await}
    </div>
</div>

<style></style>