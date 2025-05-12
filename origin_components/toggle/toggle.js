// biome-ignore lint/complexity/noForEach: <explanation>
document.querySelectorAll("[data-toggle").forEach((toggle) => {
  toggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      if (toggle.checked === false) {
        toggle.checked = true;
      } else {
        toggle.checked = false;
      }
    }
  });
});
