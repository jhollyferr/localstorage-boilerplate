const defineStorage = () => JSON.parse(localStorage.getItem("collections")) || [];
/**
 *
 * @param {Event} event
 * @returns
 */
submit.onclick = (event) => {
  event.preventDefault();
  
  const collections = defineStorage();

  const data = new FormData(form_data);
  const values = Object.fromEntries(data);

  const { name, email, password } = values;

  if ([name, email, password].includes("")) {
    toast("Please fill all fields", "warning");
    return;
  }

  const hasUserMail = collections.find(
    (user) => user.email === email
  );

  if (hasUserMail) {
    toast("User already exists", "warning");
    return;
  }

  localStorage.setItem("collections", JSON.stringify([...collections, values]));
  toast("User created", "success");

  form_data.reset();
};

/**
 *
 * @param {String} text
 * @param {String} type
 * @returns
 */
const toast = (text, type) =>
  Toastify({
    text,
    duration: 2000,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    className: type, // added to `.toast`
  }).showToast();
