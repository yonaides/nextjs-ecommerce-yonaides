const valid = (name, email, password, confirm) => {
  if (!name || !email || !password || !confirm) {
    return "Please add all required fields";
  }

  if (password !== confirm) {
    return "password are not equals";
  }

  if (!validateEmail(email)) {
    return "email not valid";
  }
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default valid;
