document.querySelectorAll("[data-select]").forEach((select) => {
  /* инициализаци элементов  */
	const
  selectInput = select.querySelector("[data-select__input]"),
  selectButton = select.querySelector("[data-select__button]"),
  selectOptions = select.querySelector("[data-select__options]");
  /* сохранение выбранного option для выделения его фона */
  let selectedOption = selectOptions.firstElementChild;
  selectedOption.setAttribute("data-selected", true);

  /* открытие/закрытие выпадающего меню по клику на кнопку 
  selectButton.addEventListener("click", (event) => {
    if (selectOptions.style.visibility === "hidden") {
      selectOptions.style.visibility = "visible";
      selectedOption.focus();

    } else {
      selectOptions.style.visibility = "hidden";
      selectInput.focus();
    };
  });*/

	
  /* открытие/закрытие выпадающего меню по клику на input */
  select.addEventListener("click", (event) => {
    if (!selectOptions.classList.contains("select__options_visible")) {
      selectOptions.classList.add("select__options_visible");
      selectInput.blur();
      event.stopPropagation() 
    } else {
      selectOptions.classList.remove("select__options_visible");
      selectInput.focus();
      event.stopPropagation() 
    }
  });

  /* установка в качестве значения селекта содержимого элемента списка по которому  кликнули */
  selectOptions.childNodes.forEach(option => {
    option.addEventListener("click", (event) => {
      selectInput.value = option.innerText;
      selectedOption.removeAttribute("data-selected");
      selectedOption = option;
      selectOptions.classList.remove("select__options_visible");
      selectedOption.setAttribute("data-selected", true);
      selectInput.focus();
			event.stopPropagation() 
		});
  });

  /* cнять выделение с выбраного option пока мышь над списком */
  selectOptions.addEventListener("mouseenter", event => {
    if (selectedOption.hasAttribute("data-selected")){
      selectedOption.removeAttribute("data-selected");
    };
  });

  /* установить выделение на option когда мышь покидает список*/
  selectOptions.addEventListener("mouseleave", event => {
    if (!selectedOption.hasAttribute("data-selected")){
      selectedOption.setAttribute("data-selected", true);
	  };
  });
	
  /* Управление с клавиатуры:
  Enter - открыть выпадающее меню
  Esc -  закрыть меню
  arowUp/arrowDown - перемещение по меню */
  select.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      if (!selectOptions.classList.contains("select__options_visible")) {
        selectOptions.classList.add("select__options_visible");
      }
      else {
        selectInput.value = selectedOption.innerText;
				selectOptions.classList.remove("select__options_visible");
        event.stopPropagation();
      }
    };
    if (event.key === "Escape") {
      selectOptions.classList.remove("select__options_visible");
    };outerHeight
    if (selectOptions.classList.contains("select__options_visible")) {
      if (event.key === "ArrowDown" && selectedOption != selectOptions.lastElementChild) {
        selectedOption.removeAttribute("data-selected");
        selectedOption = selectedOption.nextElementSibling;
        selectedOption.setAttribute("data-selected", true);
      };
      if (event.key === "ArrowUp" && selectedOption != selectOptions.firstElementChild) {
        selectedOption.removeAttribute("data-selected");
        selectedOption = selectedOption.previousElementSibling;
        selectedOption.setAttribute("data-selected", true);
      };
			if (event.ctrlKey && event.key == "Enter") {

			};
    };
	});

 /*  закрыть выпадающее меню если клик вне меню */
  document.addEventListener("click", event => {
    if (!select.contains(event.target)){
      selectOptions.classList.remove("select__options_visible");
    };
  });

});