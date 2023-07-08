window.addEventListener("keydown", (e) => {
    shiftHeld = (e.key === "Shift");
});

window.addEventListener("keyup", (e) => {
    shiftHeld = (e.key === "Shift");
});

window.addEventListener("mousemove", (e) => {
    shiftHeld = e.shiftKey;
});

export let shiftHeld;