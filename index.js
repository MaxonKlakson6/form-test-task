const useForm = (form = {}) => {
  Object.entries(form).forEach(([name, value]) => {
    const input = document.querySelector(`input[name=${name}]`);

    input.addEventListener("input", (event) => {
      const { name, value } = event.target;
      form[name] = value;
    });
  });
};

const useVisibilityInputs = (buttonClassName) => {
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


const form = {
  name: "",
  surname: "",
  birthDate: "",
  email: "",
  password: "",
  confirm: "",
};

useVisibilityInputs("visibility-btn");
useForm(form);
