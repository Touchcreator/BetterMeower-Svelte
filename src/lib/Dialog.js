//IMPORT: import Dialog from "../lib/Dialog.js";
//USAGE: Dialog("Ohio","Down in ohio, Swag like ohio.")

import {modalPage,modalShown,DialogTitle,DialogText} from "./stores";

export default function Dialog(title,text) {
    DialogTitle.set(title)
    DialogText.set(text)
    modalPage.set("Dialog")
    modalShown.set(true)
}