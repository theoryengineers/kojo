import { db } from './TodoState';

interface Database {
    boards: {
        id: number;
        title: string;
        members: number[];
        cards: number[];
        columns: string[];
    }[];
    cards: {
        id: number;
        title: string;
        category: string;
        description: string;
        column: string;
        assignment: number[];
        board: number;
    }[];
    users: {
        id: number;
        displayName: string;
        password: string;
        email: string;
    }[];
}

class Api {
    public isAuthenticated: boolean = false;

    authenticate(email: string, password: string, cb: (displayName: string) => void) {
        const Users = db.users;
        const User = Users.filter(
            user => (user.email === email) && (user.password === password)
        );
        if (User.length > 0) {
            this.isAuthenticated = true;
            cb(User[0].displayName);
        }
        // fetch('http://localhost:8080/api/v1/login', {
        //         method: 'post',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify({
        //         email: email,
        //         password: password
        //     })
        // })    
        // .then(res => res.json())
        // .then(() => cb())
        // .catch(console.log);  // Make error handler
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
        setTimeout(cb, 100);
    }

    getDatabase(): Database {
        return db;
    }
}

export default new Api();