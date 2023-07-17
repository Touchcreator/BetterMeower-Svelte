// @ts-nocheck
import Jed from "jed";

export async function i18n_config() {
    const lang = {
        "fr": await fetch(
            new URL("./i18n/fr.json").href,
            import.meta.url
        ).then(res => res.json())
    };

    window.i18n = new Jed({ "locale_data": lang, "domain": "fr" });
    // navigator.language.split("-")[0]
}
