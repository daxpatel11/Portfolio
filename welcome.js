/* A progressive-enhancement welcome: content remains usable if JS/storage fails. */
(() => {
  "use strict";
  const dialog = document.getElementById("welcome");
  const word = document.getElementById("welcome-word");
  const skip = document.getElementById("welcome-skip");
  const seenKey = "dax-welcome-seen";
  // Do not delay deep links or users who prefer reduced motion.
  if (!dialog?.showModal || location.hash || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try { if (sessionStorage.getItem(seenKey)) return; } catch { /* storage is optional */ }

  const greetings = [
    ["Hello.", "en"], ["नमस्ते.", "hi"], ["નમસ્તે.", "gu"],
    ["Bonjour.", "fr"], ["Hola.", "es"], ["こんにちは.", "ja"], ["Hi there.", "en"],
  ];
  let index = 0, timer, exitTimer, finished = false;
  const originalOverflow = document.body.style.overflow;
  const finish = (immediate = false) => {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    try { sessionStorage.setItem(seenKey, "1"); } catch { /* no persistence needed */ }
    const close = () => {
      clearTimeout(exitTimer);
      if (dialog.open) dialog.close();
      document.body.style.overflow = originalOverflow;
    };
    if (immediate) return close();
    dialog.classList.add("welcome-exit");
    exitTimer = setTimeout(close, 320);
  };
  const advance = () => {
    index += 1;
    if (index === greetings.length) return finish();
    const [text, language] = greetings[index];
    word.textContent = text;
    word.lang = language;
    timer = setTimeout(advance, index === greetings.length - 1 ? 420 : 270);
  };
  skip.addEventListener("click", () => finish(true));
  dialog.addEventListener("cancel", (event) => { event.preventDefault(); finish(true); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) finish(true); });
  dialog.showModal();
  document.body.style.overflow = "hidden";
  timer = setTimeout(advance, 380);
})();
