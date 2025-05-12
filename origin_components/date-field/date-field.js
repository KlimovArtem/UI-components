// biome-ignore lint/complexity/noForEach: <explanation>
document.querySelectorAll("[data-date-field]").forEach((dateField) => {
  /* инициализация элементов */
  const dateFieldInput = dateField.querySelector("[data-date-field__input]");
  const datePicker = dateField.querySelector("[data-date-picker]");
  const datePickerOpneButton = dateField.querySelector(
      "[data-date-picker__open-button]",
    );
  const datePickerMonthSwitcherTitle = datePicker.querySelector(
      "[data-date-picker__month-switcher-title]",
    );
  const datePickerMonthSwitcherIncreaseButton = datePicker.querySelector(
      "[data-date-picker__month-switcher-increase-button]",
    );
  const datePickerMonthSwitcherDeacreaseButton = datePicker.querySelector(
      "[data-date-picker__month-switcher-deacrease-button]",
    );
  const datePickerDates = datePicker.querySelector("[data-date-picker__dates]");

  /* открытие/закрытие выпадающего меню по клику на кнопку */
  datePickerOpneButton.addEventListener("click", (event) => {
    if (!datePicker.classList.contains("date-picker_visible")) {
      datePicker.classList.add("date-picker_visible");
      generateCalendar();
      event.stopPropagation();
    } else {
      datePicker.classList.remove("date-picker_visible");
      dateFieldInput.focus();
      event.stopPropagation();
    }
  });

  /* Управление с клавиатуры:
  Enter - открыть календарь
  Esc -  закрыть календарь */
  dateField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      if (!datePicker.classList.contains("date-picker_visible")) {
        dateFieldInput.blur();
        generateCalendar();
        datePicker.classList.add("date-picker_visible");
        datePickerMonthSwitcherDeacreaseButton.focus();
      }
    }
    if (
      event.key === "Escape" &&
      datePicker.classList.contains("date-picker_visible")
    ) {
      datePicker.classList.remove("date-picker_visible");
      dateFieldInput.focus();
    }
  });

  /* инициализация глобальных переменных для генерации календаря */
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();

  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const weekDays = new Map([
    [0, 6],
    [1, 0],
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 4],
    [6, 5],
  ]);

  /* генерация календаря */
  const generateCalendar = () => {
    /* инициализация локальных переменных для генерации календарая */
    const monthFirstWeekDay = weekDays.get(
        new Date(year, month, 1).getDay(),
      ) /* Какой день недели первое число месяца */;
    const daysInMonth = new Date(
        year,
        month + 1,
        0,
      ).getDate() /* Количество дней в месяце */;
    const monthLastWeakDay = weekDays.get(
        new Date(year, month, daysInMonth).getDay(),
      ) /* Какой день недели последнее число месяца */;
    const daysInLastMonth = new Date(
        year,
        month,
        0,
      ).getDate() /* Количество дней в прошлом месяце */;
    let dates = "";

    dates += "<tr>";

    /* генерация последних дней предыдущего месяца */
    for (let i = monthFirstWeekDay; i > 0; i--) {
      dates += `<td class="date-picker__date-cell_inactive">${daysInLastMonth - i + 1}</td>`;
    }

    /* генерация дней месяца */
    for (let i = 1; i <= daysInMonth; i++) {
      const currentWeekDay = weekDays.get(
        new Date(year, month, i).getDay(),
      ); /* текущий день недели */
      if (currentWeekDay === 6) {
        dates += `<td class="date-picker__date-cell" data-date-picker__date-cell tabindex=0>${i}</td></tr><tr>`;
      } else {
        dates += `<td class="date-picker__date-cell" data-date-picker__date-cell tabindex=0>${i}</td>`;
      }
    }

    /* генерация первых дней следующего месяца */
    for (let i = monthLastWeakDay; i < 6; i++) {
      dates += `<td class="date-picker__date-cell_inactive">${i - monthLastWeakDay + 1}</td>`;
    }
    dates += "</tr>";
    datePickerMonthSwitcherTitle.innerText = `${months[month]} ${year}`;
    datePickerDates.innerHTML = dates;

    // biome-ignore lint/complexity/noForEach: <explanation>
    datePickerDates
      .querySelectorAll("[data-date-picker__date-cell]")
      .forEach((cell) => {
        cell.addEventListener("click", (event) => {
          const choosenDate = new Date(year, month, cell.innerText);
          dateFieldInput.value = choosenDate.toLocaleDateString("ru");
          datePicker.classList.remove("date-picker_visible");
          dateFieldInput.focus();
        });

        cell.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            const choosenDate = new Date(year, month, cell.innerText);
            dateFieldInput.value = choosenDate.toLocaleDateString("ru");
            datePicker.classList.remove("date-picker_visible");
            dateFieldInput.focus();
            event.stopPropagation();
          }
        });
      });
  };

  /* Переключение месяца: уменьшение месяца */
  datePickerMonthSwitcherDeacreaseButton.addEventListener("click", () => {
    month -= 1;
    if (month < 0 || month > 11) {
      date = new Date(year, month, new Date().getDate());
      year = date.getFullYear();
      month = date.getMonth();
    } else {
      date = new Date();
    }

    generateCalendar();
    event.stopPropagation();
  });

  /* Переключение месяца: увеличение месяца */
  datePickerMonthSwitcherIncreaseButton.addEventListener("click", () => {
    month += 1;
    if (month < 0 || month > 11) {
      date = new Date(year, month, new Date().getDate());
      year = date.getFullYear();
      month = date.getMonth();
    } else {
      date = new Date();
    }

    generateCalendar();
    event.stopPropagation();
  });

  /*закрытие при щелчке вне модального окна */
  document.addEventListener("click", (event) => {
    const datePickerRect = datePicker.getBoundingClientRect();

    if (
      event.clientX < datePickerRect.left ||
      event.clientX > datePickerRect.right ||
      event.clientY < datePickerRect.top ||
      event.clientY > datePickerRect.bottom
    ) {
      datePicker.classList.remove("date-picker_visible");
    }
  });
});
