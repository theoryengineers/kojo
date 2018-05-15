const rootUrl = 'http://localhost:5500/api/v1';

export module Api {
    export async function authenticate(email: string, password: string) {  
        try {

            const response = await fetch(`${rootUrl}/login`, {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });    
            const resObj = await response.json();

            return resObj;
        } catch (err) {
            console.log(err);
        }
    }
}
