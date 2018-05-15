const rootUrl = 'http://localhost:5500/api/v1';

export module Api {
    export async function authenticate(
        email: string,
        password: string
    ) {
        try {
            const response = await fetch(`${rootUrl}/login`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    export async function register(
        fname: String,
        lname: String,
        displayname: String,
        email: String,
        password: String
    ) {
        try {
            const response = await fetch(`${rootUrl}/register`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fname: fname,
                    lname: lname,
                    displayname: displayname,
                    email: email,
                    password: password
                })
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }
}
