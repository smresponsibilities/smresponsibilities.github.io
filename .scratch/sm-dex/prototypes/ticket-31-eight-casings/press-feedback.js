// The hardware face is momentary. Application actions happen only after activation is released.
export function bindPressFeedback(button, { press, release }) {
  let heldKey = null;
  const cancel = () => {
    heldKey = null;
    release();
  };
  button.addEventListener("pointerdown", (event) => {
    if (event.button === 0) press();
  });
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", cancel);
  button.addEventListener("pointerleave", () => {
    if (!heldKey) release();
  });
  button.addEventListener("keydown", (event) => {
    if (event.key !== " " && event.key !== "Enter") return;
    // Native Enter activates on keydown. Defer it so the lid cannot disappear while held.
    event.preventDefault();
    if (event.repeat || heldKey) return;
    heldKey = event.key;
    press();
  });
  button.addEventListener("keyup", (event) => {
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    if (heldKey !== event.key) return;
    cancel();
    button.click();
  });
  button.addEventListener("blur", cancel);
  return cancel;
}
