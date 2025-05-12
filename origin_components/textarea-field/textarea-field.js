// biome-ignore lint/complexity/noForEach: <explanation>
document.querySelectorAll("[data-textarea-field]").forEach((textarea) => {
  const textareaInput = textarea.querySelector("[data-textarea-field__input]");
  const maxlengthInfo = textarea.querySelector(
      "[data-textarea-field__maxlenght-info]",
    );

  textareaInput.addEventListener("input", (event) => {
    if (textareaInput.hasAttribute("maxlength")) {
      maxlengthInfo.innerText = `${textareaInput.value.length}/${textareaInput.maxLength}`;
    }
  });
});
