let email = document.querySelector("#email");
let pass = document.querySelector("#pass");
let btn = document.querySelector("#submit");

btn.onclick = () => {
  const regReq = async () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    
    let raw = JSON.stringify({
      'email': email.value,
      'password': pass.value,
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    try {
      let v = await fetch("http://localhost:8080/sessions", requestOptions)
      if (v.ok) {
<<<<<<< HEAD
        
      }
=======
        let cookie = ok.headers.keys()
          window.location = "themes.html"
        }
>>>>>>> e9ab53a15a15f63da440a26e61dc66a8f8f15f2b
    } catch (err) {
      console.log(err)
    }
  }

  regReq()
};
