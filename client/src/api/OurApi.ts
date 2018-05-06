import { db } from './TodoState';
import { Database, ResObjLogin, ResObjProjectsById } from 'app_modules/types';

class Api {
    public isAuthenticated: boolean = false;

    authenticate(email: string, password: string, cb: (res: ResObjLogin) => void) {
        // const Users = db.users;
        // const User = Users.filter(
        //     user => (user.email === email) && (user.password === password)
        // );
        // if (User.length > 0) {
        //     this.isAuthenticated = true;
        //     cb(User[0].displayName);
        // }
        fetch('http://localhost:5500/api/v1/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(res => cb((res as ResObjLogin)))
            .catch(console.log);  // Make error handler
    }

    register(
        fname: string,
        lname: string,
        displayname: string,
        email: string,
        password: string,
        cb: (res: ResObjLogin) => void) {
        fetch('http://localhost:5500/api/v1/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fname: fname,
                lname: lname,
                displayname: displayname,
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(res => cb((res as ResObjLogin)))
            .catch(console.log);
    }

    getProjectsById(userid: number, cb: (res: Array<ResObjProjectsById>) => void) {
        fetch('http://localhost:1337/api/v1/projects/' + userid, {
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