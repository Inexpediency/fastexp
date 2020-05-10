const Users = require("../apiworker/users/user");
const Tags = require("../apiworker/tags/tag")

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
	for (let uid in utasks) {
		let founded = false
		for (let cid in ctasks) {
			if (utasks[uid] === ctasks[cid]) {
				founded = true
				break
			}
		}
		if (founded) {
			user_tags_display.push(new Tag(utasks[uid], true))
		} else {
			user_tags_display.push(new Tag(utasks[uid], false))
		}
	}
	return user_tags_display
}

let user
Users.whoami()
	.then(u => user = u)
	.catch(err => {
		console.log(err)
		window.location = "auth.html"
	})
console.log(user)

let command_tags
Tags.get_command_tags(1)
	.then(ct => command_tags = ct.tags)
	.catch(err => console.log(err))

console.log(command_tags)

let tags_to_display = get_user_tags_to_display(user.tags, command_tags)

let h1 = document.querySelector("h1");
let tags_container = document.querySelector(".tags");

h1.textContent = "С возвращением, " + user.email;

for (let tg in tags_to_display) {
	let new_tag = document.createElement('div')
	new_tag.classList.add('tag')
	if (tags_to_display[tg].is_pinned) {
		let img = document.createElement('img');
		img.setAttribute('src', 'image/profile.jpg');
		new_tag.appendChild(img);
	}
	tags_container.appendChild(new_tag)
}
