// @ts-nocheck
import Jed from "jed";

export function i18n_config() {
    const lang = {
        "fr": {
            "": {
                "domain": "fr",
                "language": "fr",
                "plural-forms": "nplurals=2; plural=(n != 1);"
            },
            "Home": ["Maison"],
            "Welcome back,": ["Bievenue dos,"],
            "Hello, guest!": ["Bonjour, invité!"],
            "To sign in or create an account, click the profile button on the sidebar.": ["Pour se connecter ou créer un compte, clic le profil sur le encadré."],
            "Users Online": ["Utilisateurs Connecté"],
            "users online": ["utilisateurs connecté"],
            "Post": ["Poster"],
            "Write something...": ["Écrie quelque chose..."],
            "There are currently": ["Là sont actuellement"],
            "1 minute ago": ["1 minute il y a", "%d minute il y a"],
            "just now": ["à l'instant"],
            "1 second ago": ["1 seconde il y a", "%d secondes il y a"],
            "1 hour ago": ["1 heure il y a", "%d heures il y a"],
            "1 day ago": ["1 jour il y a", "%d jours il y a"],
            "1 month ago": ["1 mois il y a", "%d mois il y a"],
            "1 year ago": ["1 année il y a", "%d année il y a"],
        }
    }

    window.i18n = new Jed({ "locale_data": lang, "domain": "fr" });
    // navigator.language.split("-")[0]
}
