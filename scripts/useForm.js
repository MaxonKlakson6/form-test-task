export const useForm = (form = {}) => {
  Object.entries(form).forEach(([name, value]) => {
    const input = document.querySelector(`input[name=${name}]`);

    input.addEventListener("input", (event) => {
      const { name, value } = event.target;
      form[name] = value;
    });
  });
};
