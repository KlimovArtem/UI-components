document.querySelectorAll("[data-popover-open-btn]").forEach(openBtn  => {
  let popover = document.querySelector("[data-popover]");
  
  openBtn.addEventListener("click", e => {
    popover.showModal();

    /* установка блокировки скрола */
    document.body.classList.add("scroll-lock");
  });
});

document.querySelectorAll("[data-popover]").forEach(popover => {
  const closeButton = popover.querySelector("[data-popover__close-button]");
  
  closeButton.addEventListener("click", event => {
    popover.close()
  });
  /* подтверждение закрытия через Esc*/
  popover.addEventListener('cancel', (event) => {
  event.preventDefault();
  /* снятие блокировки скрола */
  document.body.classList.remove("scroll-lock");
})
  
  /*закрытие при щелчке вне модального окна */
  popover.addEventListener("click", event => {
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