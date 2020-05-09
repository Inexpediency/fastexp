const server_url = require('../server_url')

class TagList {

    static get_command_tags_url = '/private/get_command_tags'
    static set_person_tags_url ='/private/set_person_tags'

    static async get_command_tags(command_id) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        let raw = JSON.stringify({
            "command_id": command_id
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        let tag_list = {
            'err': null,
            'tags': null,
        };

        try {
            let res = await fetch(server_url + TagList.get_command_tags_url, requestOptions)
            if (res.ok) {
                res = await res.json()
                tag_list.tags = res.tags
            } else {
                tag_list.err = true
            }
        } catch(err) {
            tag_list.err = err
            return tag_list
        }
        
        return tag_list
    }

    static async set_person_tags(person_id, list_of_tags) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "person_id": person_id,
            "tag_list": list_of_tags
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        let isOk = true;
        let res = await fetch(server_url + this.set_person_tags_url, requestOptions)
        if (!res.ok)
            isOk = false

        return isOk
    }
}

module.exports = TagList;
