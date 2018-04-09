class Api {
    public isAuthenticated: boolean = false;

    authenticate(email: string, password: string, cb: () => void) {
        this.isAuthenticated = true;
        fetch('http://localhost:8080/api/v1/login', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                email: email,
                password: password
            })
        })    
        .then(res => res.json())
        .then(() => cb())
        .catch(console.log);  // Make error handler
    }

    register(displayName: string, email: string, password: string, cb: () => void) {
        fetch('http://localhost:8080/api/v1/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                displayName: displayName,
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(() => cb())
        .catch(console.log);
    }

    signout(cb: () => void) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
}

export default new Api();