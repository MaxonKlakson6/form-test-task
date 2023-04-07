const form = {
  name: "",
  surname: "",
  birthDate: "",
  email: "",
  password: "",
  confirm: "",
};

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,}$/;

const useForm = (form = {}) => {
  Object.entries(form).forEach(([name]) => {
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

useVisibilityInputs("visibility-btn");
useForm(form);

const addFormSubmition = (formId, submitCallback) => {
  const formNode = document.querySelector(`#${formId}`);

  formNode.addEventListener("submit", submitCallback);
};

const validateSignUpForm = (form) => {
  const errors = {};
  const today = new Date();

  if (!form.name) {
    errors.name = "Name is a required field";
  } else if (form.name.length < 2) {
    errors.name = "Name too short";
  } else if (form.name.length > 25) {
    errors.name = "Name too long";
  }

  if (!form.surname) {
    errors.surname = "Surname is a required field";
  } else if (form.surname.length < 2) {
    errors.surname = "Surname too short";
  } else if (form.surname.length > 25) {
    errors.surname = "Surname too long";
  }

  if (!form.birthDate) {
    errors.birthDate = "Birth date is a required field";
  } else if (new Date(form.birthDate) > today) {
    errors.birthDate = "Today is a max available date";
  }

  if (!form.email) {
    errors.email = "Email is a required field";
  } else if (!form.email.toLowerCase().match(emailRegExp)) {
    errors.email = "Email must be an email";
  }

  if (!form.password) {
    errors.password = "Password is a required field";
  } else if (!form.password.match(passwordRegExp)) {
    errors.password = "Wrong password";
  }

  if (form.confirm !== form.password) {
    errors.confirm = "Passwords aren't equal";
  }

  return errors;
};

const createErrorPrinter = () => {
  const nodeList = Object.entries(form).map(([name]) => ({
    name,
    node: (noticeBlock = document.querySelector(`#notice-${name}`)),
  }));

  return (errors) => {
    nodeList.forEach(({ name, node }) => {
      if (!errors[name]) {
        node.innerHTML = "";
      } else {
        node.innerHTML = errors[name];
      }
    });
  };
};

const printSignUpErrors = createErrorPrinter();

const signUp = (event) => {
  event.preventDefault();
  const errors = validateSignUpForm(form);
  printSignUpErrors(errors);

  if (Object.values(errors).every((error) => !error)) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(console.log);
  }
};

addFormSubmition("sign-up-form", signUp);
