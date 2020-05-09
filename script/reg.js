// let firstName = document.querySelector("#firstname");
// let lastName = document.querySelector("#lastname");
let email = document.querySelector("#email");
let pass = document.querySelector("#pass");
let passAgain = document.querySelector("#pass-again");
let btn = document.querySelector("#submit");
let auth = document.querySelector("#auth");

btn.onclick = () => {
  if (pass.value === passAgain.value) {
    let regRequest = new Promise((resolve, reject) => {
      fetch("localhost:8080/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body:
          '{"email": "' + email.value + '", "password": "' + pass.value + '"}',
      }).then((data) => resolve(data.json()));
    });

    regRequest.then((value) => {
      if (status === 200) {
        let authRequest = new Promise((resolve, reject) => {
          fetch("localhost:8080/sessions", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body:
              '{"email": "' +
              email.value +
              '", "password": "' +
              pass.value +
              '"}',
          }).then((data) => resolve(data.json()));
        });
        authRequest.then(() => (window.location = "technologyes.html"));
      }
    });
  }
};
