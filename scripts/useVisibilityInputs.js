export const useVisibilityInputs = (buttonClassName) => {
  const visibilityButtonList = document.querySelectorAll(`.${buttonClassName}`);

  Array.from(visibilityButtonList).forEach((button) => {
    const inputId = button.attributes.for.value;
    const input = document.querySelector(`#${inputId}`);

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.target.classList.toggle(`${buttonClassName}-on`);

      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    });
  });
};
