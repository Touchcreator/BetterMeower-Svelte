import {modalPage,modalShown} from "./stores";

export function Show(modal) {
    modalPage.set(modal)
    modalShown.set(true)
}

export function Hide() {
    modalShown.set(false)
}