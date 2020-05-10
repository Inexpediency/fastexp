const server_url = "http://localhost:8080";

class User {
    static whoami_url = '/private/whoami'

    static async whoami() {
        let requestOptions = {
            method: 'GET',
        };
    
        let user = {
            err: null,
            id: null,
            email: null,
            tags: null,
        }

        try {
            let res = await fetch(server_url + User.whoami_url, requestOptions)
            if (res.ok) {
                res = await res.json()
                user.id = res.id
                user.email = res.email
                user.tags = res.tags
            } else {
                user.err = true
            }
        } catch(err) {
            user.err = err
        }

        return user
    }
}

class TagList {
	static get_command_tags_url = "/private/get_command_tags";
	static get_user_tags_url = "/private/get_user_tags";
	static set_user_tags_url = "/private/set_user_tags";
  
	static async get_command_tags_(command_id) {
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
	
		let raw = JSON.stringify({
		  command_id: command_id,
		});
	
		let requestOptions = {
		  method: "POST",
		  headers: myHeaders,
		  body: raw,
		};
	
		let tag_list = {
		  err: null,
		  tags: null,
		};
	
		try {
		  let res = await fetch(
			server_url + TagList.get_command_tags_url,
			requestOptions
		  );
		  if (res.ok) {
			res = await res.json();
			tag_list.tags = res.tags;
		  } else {
			tag_list.err = true;
		  }
		} catch (err) {
		  tag_list.err = err;
		}
	
		tag_list = {
			err: null,
			tags: ['Docker', 'Go RabbitMq', 'uber-go', 'Aliases web-pack', 'babel', 'SOLID']
		}
	
		return tag_list;
	}

	static get_command_tags(command_id) {	
		let tag_list = {
			err: null,
			tags: ['Docker', 'Go RabbitMq', 'uber-go', 'Aliases web-pack', 'babel', 'SOLID']
		}
  
	  return tag_list;
	}
  
	static async get_user_tags(user_id) {
	  let myHeaders = new Headers();
	  myHeaders.append("Content-Type", "application/json");
  
	  let raw = JSON.stringify({
		user_id: user_id,
	  });
  
	  let requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
	  };
  
	  let tag_list = {
		err: null,
		tags: null,
	  };
  
	  try {
		let res = await fetch(
		  server_url + TagList.get_user_tags_url,
		  requestOptions
		);
		if (res.ok) {
		  res = await res.json();
		  tag_list.tags = res.tags;
		} else {
		  tag_list.err = true;
		}
	  } catch (err) {
		tag_list.err = err;
	  }
  
	  return tag_list;
	}
  
	static async set_user_tags_(list_of_tags) {
	  let myHeaders = new Headers();
	  myHeaders.append("Content-Type", "application/json");
  
	  let raw = JSON.stringify({
		tag_list: list_of_tags,
	  });
  
	  let requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
	  };
  
	  let isOk = true;
	  let res = await fetch(
		server_url + TagList.set_user_tags_url,
		requestOptions
	  );
	  if (!res.ok) isOk = false;
  
	  return isOk;
	}
  }


class Tag {
	constructor(text, is_pinned) {
		this.text = text
		this.is_pinned = is_pinned
	}

	compare(text) {
		if (this.text === text) 
			return true
		return false
	}
}

const get_user_tags_to_display = (ctasks, utasks) => {
	let user_tags_display = []

	let founded = -1
	for (let cid = 0; cid < ctasks.length; cid++) {
		founded = -1
		for (let uid in utasks) {
			if (utasks[uid] === ctasks[cid]) {
				founded = uid
			}
		}
		if (founded != -1) {
			user_tags_display.push(new Tag(ctasks[cid], true))
		} else {
			user_tags_display.push(new Tag(ctasks[cid], false))
		}
	}
	return user_tags_display
}

const update_user_tags = (alltags) => {
	let user_tags = []
	for (let t in alltags) {
		if (alltags[t].is_pinned) {
			user_tags.push(alltags[t])
		}
	}
	TagList.set_user_tags(user_tags)
}

const run = async () => {
	try {
		let user = await User.whoami()
		let command_tags = await TagList.get_command_tags(1)
		
		user.tags = ['Docker', 'uber-go']
		let tags_to_display = get_user_tags_to_display(command_tags.tags, user.tags)
	
		let h1 = document.querySelector("h1");
		let tags_container = document.querySelector(".tags");
		
		h1.textContent = "С возвращением, " + user.email;
		
		for (let tg in tags_to_display) {
			let new_tag = document.createElement('div')
			new_tag.classList.add('tag')

			let new_tag_paragraph = document.createElement('p')
			new_tag_paragraph.textContent = tags_to_display[tg].text
			new_tag.appendChild(new_tag_paragraph)

			new_tag.addEventListener('click', () => {
				tags_to_display[tg].is_pinned = !tags_to_display[tg].is_pinned
				tags_container.innerHTML = ""
				update_user_tags(tags_to_display)
				run()
			})

			if (tags_to_display[tg].is_pinned) {
				let img = document.createElement('img');
				img.setAttribute('src', 'image/profile.jpg');
				new_tag.appendChild(img);
			}
			tags_container.appendChild(new_tag)
		}

	} catch(err) {
		console.log(err)
		window.location = "auth.html"	
	}
}

const update = (alltags) => {
	let user_tags = []
	for (let t in alltags) {
		if (alltags[t].is_pinned) {
			user_tags.push(alltags[t])
		}
	}

	return user_tags
}

command_id = 1;

const startingpage = (user_tags, user_email, tags_to_display) => {
	let h1 = document.querySelector("h1");
	let tags_container = document.querySelector(".tags");

	h1.textContent = "С возвращением, " + user_email;

	for (let tg in tags_to_display) {
		let new_tag = document.createElement('div')
		new_tag.classList.add('tag')

		let new_tag_paragraph = document.createElement('p')
		new_tag_paragraph.textContent = tags_to_display[tg].text
		new_tag.appendChild(new_tag_paragraph)

		new_tag.addEventListener('click', () => {
			tags_to_display[tg].is_pinned = !tags_to_display[tg].is_pinned
			tags_container.innerHTML = ""
			user_tags = update(tags_to_display)
			startingpage(user_tags, user_email, tags_to_display)
		})

		if (tags_to_display[tg].is_pinned) {
			let img = document.createElement('img');
			img.setAttribute('src', 'image/checkbox.svg');
			new_tag.appendChild(img);
		}
		tags_container.appendChild(new_tag)
	}
}

let user_tags = ['Docker', 'uber-go']
let command_tags = TagList.get_command_tags(command_id).tags
let user_email = 'nullptr@test.go'
let tags_to_display = get_user_tags_to_display(command_tags, user_tags)
startingpage(user_tags, user_email, tags_to_display)
