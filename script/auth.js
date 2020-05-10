let email = document.querySelector("#email");
let pass = document.querySelector("#pass");
let btn = document.querySelector("#submit");

const server_url = 'http://localhost:8080'
const auth_url = '/users'

btn.onclick = () => {
  const authReq = async () => {
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
<<<<<<< HEAD
      let v = await fetch("http://localhost:8080/sessions", requestOptions)
      if (v.ok) {
        let cookie = ok.headers.keys()
          window.location = "themes.html"
        }
    } catch (err) {
      console.log(err)
=======
		let v = await fetch(server_url + auth_url, requestOptions)
		if (v.ok) {
			let cookie = ok.headers.keys()
			window.location = "themes.html"
			}
	} catch (err) {
		console.log(err)
>>>>>>> 2edc81a4934a27f0cd99231c5aacdcc3e1d8dcde
    }
  }

  authReq()
};
