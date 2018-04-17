require('dotenv').config();
import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as bcrypt from 'bcryptjs';
import * as cors from 'cors';
import * as knex from 'knex';
import Controllers from './controllers';


const port = process.env.PORT || 1337;

const db = knex({
    client: 'pg',
    connection: {
        host : process.env.DB_HOST || '127.0.0.1',
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : 'kojo'
    }
});

const controllers = new Controllers(db)
const {
    register,
    login,
    user,
    project,
    backlog,
    task,
    sprint,
    assignment,
} = controllers;

login.testLoginsMethod()

const app = Express();
app.use(cors());
app.use(bodyParser.json());

app.use('/welcome', (req, res) => {
    res.send('hello world')
});

app.post('/v1/register', register.handleRegister(bcrypt));
app.post('/v1/login', login.handleLogin(bcrypt));

app.get('/v1/users', user.getAllUsers);
app.get('/v1/users/:userId', user.getUser);

app.get('/v1/projects', project.getAllProjects);
app.get('/v1/projects/:userId', project.getProject);


app.listen(port, () => console.log('Listening at port', port));

/*
    /login
    /register
    /users
    /organizations
    /projects
    /sprits
    /tasks
*/