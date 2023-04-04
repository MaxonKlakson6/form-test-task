import { useForm } from "./scripts/useForm.js";
import { useVisibilityInputs } from "./scripts/useVisibilityInputs.js";

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
