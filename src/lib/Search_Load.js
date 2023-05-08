import {apiUrl, encodeApiURLParams} from "../lib/urls.js";

let pageLoading = false

let results = []
let id = 0;

let numPages = 0
let pagesLoaded = 0
let resOffset = 0

export async function reset() {
    pageLoading = false
    results = []
    id = 0;
    numPages = 0
    pagesLoaded = 0
    resOffset = 0
}

export async function loadUserResults(page, query) {
    pageLoading = true;
    if (page === undefined) {
        results = [];
    } else {
        // 25 posts per page...
        let realPage = page + Math.floor(resOffset / 25);
        let realOffset = resOffset % 25;

        try {
            let path = `search/users?autoget&page=`;
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
                results.push(res);
            }
            pagesLoaded = page;
        } catch(e) {
            pageLoading = false;
            throw e;
        }
    }
    results = results;
    pageLoading = false;
    return [results,pagesLoaded,numPages];
}