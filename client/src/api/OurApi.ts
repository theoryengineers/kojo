import { db } from './TodoState';
import { Database } from 'app_modules/types';

class Api {
    public isAuthenticated: boolean = false;

    authenticate(email: string, password: string, cb: (displayName: string) => void) {
        // const Users = db.users;
        // const User = Users.filter(
        //     user => (user.email === email) && (user.password === password)
        // );
        // if (User.length > 0) {
        //     this.isAuthenticated = true;
        //     cb(User[0].displayName);
        // }
        fetch('http://localhost:1337/v1/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usernameOrEmail: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(res => cb(res.name))
            .catch(console.log);  // Make error handler
    }

    register(displayName: string, email: string, password: string, cb: () => void) {
        fetch('http://localhost:8080/api/v1/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
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
    }

    getDatabase(): Database {
        return db;
    }
}

export default new Api();