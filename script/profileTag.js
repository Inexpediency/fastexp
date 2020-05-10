const Users = require("../apiworker/users/user");
let h1 = document.querySelector("h1");
let tags = document.querySelector(".tags");
Users.whoami().then((result) => {
  if (result.err === null) {
    h1.textContent = "С возвращением, " + result.email;
    for (let i = 0; i < tags.children.length; i++) {
      for (let k = 0; k < result.tags.length; k++)
        if (tags.children[i].textContent === result.tags[k]) {
          let img = document.createElement("img");
          img.setAttribute("src", "image/profile.jpg");
          tags.children[i].appendChild(img);
        }
    }
  } else {
    window.location = "auth.html";
  }
});
