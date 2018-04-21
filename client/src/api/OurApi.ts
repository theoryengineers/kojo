import { db } from './TodoState';
import { Database, ResponseObject, ResObjProjectsById } from 'app_modules/types';

class Api {
    public isAuthenticated: boolean = false;

    authenticate(email: string, password: string, cb: (res: ResponseObject) => void) {
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
            .then(res => cb((res as ResponseObject)))
            .catch(console.log);  // Make error handler
    }

    register(name: string, username: string, email: string, password: string, cb: (res: ResponseObject) => void) {
        fetch('http://localhost:1337/v1/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                username: username,
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(res => cb((res as ResponseObject)))
            .catch(console.log);
    }

    getProjectsById(userid: number, cb: (res: Array<ResObjProjectsById>) => void) {
        fetch('http://localhost:1337/v1/projects/' + userid, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(res => cb(res))
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