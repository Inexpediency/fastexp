const server_url = require('../server_url')

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
        }

        try {
            let res = await fetch(server_url + User.whoami, requestOptions)
            if (res.ok) {
                res = await res.json()
                user.id = res.id
                user.email = res.email
            } else {
                user.err = true
            }
        } catch(err) {
            user.err = err
        } 

        return user
    }
}

module.exports = User;
