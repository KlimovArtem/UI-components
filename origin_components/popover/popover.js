// biome-ignore lint/complexity/noForEach: <explanation>
document.querySelectorAll("[data-popover-open-btn]").forEach((openBtn) => {
  const popover = document.querySelector("[data-popover]");

  openBtn.addEventListener("click", () => {
    popover.showModal();

    /* установка блокировки скрола */
    document.body.classList.add("scroll-lock");
  });
});

// biome-ignore lint/complexity/noForEach: <explanation>
document.querySelectorAll("[data-popover]").forEach((popover) => {
  const closeButton = popover.querySelector("[data-popover__close-button]");

  closeButton.addEventListener("click", () => {
    popover.close();
  });
  /* подтверждение закрытия через Esc*/
  popover.addEventListener("cancel", (event) => {
    event.preventDefault();
    /* снятие блокировки скрола */
    document.body.classList.remove("scroll-lock");
  });

  /*закрытие при щелчке вне модального окна */
  popover.addEventListener("click", (event) => {
    const popoverRect = popover.getBoundingClientRect();

    if (
      event.clientX < popoverRect.left ||
      event.clientX > popoverRect.right ||
      event.clientY < popoverRect.top ||
      event.clientY > popoverRect.bottom
    ) {
      popover.close();
      document.body.classList.remove("scroll-lock");
    }
  });
});
