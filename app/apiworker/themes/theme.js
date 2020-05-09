const server_url = require('../server_url')

class Theme {
    static get_theme_url = '/private/get_theme'

    static async get_theme(technology_id) {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        
        let raw = JSON.stringify({
            'technology_id': technology_id
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        let theme = {
            'err': null,
            'title': null,
            'content': null,
            'id': null,
        };

        try {
            let res = await fetch(server_url + Theme.get_theme_url, requestOptions)
            if (res.ok) {
                res = await res.json()
                theme.title = res.title
                theme.content = res.content
                theme.id = res.id
            } else {
                theme.err = true
            }
        } catch(err) {
            theme.err = err
        }
        
        return theme
    }
}

module.exports = Theme;
