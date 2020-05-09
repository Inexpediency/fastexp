let email = document.querySelector("#email");
let pass = document.querySelector("#pass");
let btn = document.querySelector("#submit");

btn.onclick = () => {
  let authRequest = new Promise((resolve, reject) => {
    fetch("http://localhost:8080/sessions", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body:
        '{"email": "' + email.value + '", "password": "' + pass.value + '"}',
    }).then((data) => resolve(data.json()));
  });
  authRequest.then(() => {
    if (status === 200) {
      window.location = "themes.html";
    }
  });
};
