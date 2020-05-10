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
		let v = await fetch(server_url + auth_url, requestOptions)
		if (v.ok) {
			let cookie = ok.headers.keys()
			window.location = "themes.html"
			}
	} catch (err) {
		console.log(err)
    }
  }

  authReq()
};
