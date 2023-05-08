import {user} from "./stores.js"
let user_
user.subscribe(v => {
    user_ = v
})

function notification() {
    var audio = new Audio('../src/assets/menu_notify.wav');
    audio.play();
}

export function playNotification() {
    if (user_.sfx) {
        notification();
    }
}