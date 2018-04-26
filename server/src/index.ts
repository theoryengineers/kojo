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
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'password',
        database: 'kojo'
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
    assignment,
} = controllers;

const app = Express();
app.use(cors());
app.use(bodyParser.json());

app.use('/welcome', (req, res) => {
    res.send('hello world')
});

app.post('/v1/register', register.handleRegister(bcrypt));
app.post('/v1/login', login.handleLogin(bcrypt));

app.get('/v1/users', user.handleGetAllUsers);
app.get('/v1/users/:userId', user.handleGetUser);
app.put('/v1/users/:userId', user.handleUpdateUser);

app.get('/v1/projects', project.getAllProjects);
app.get('/v1/projects/:userId', project.getProject);
app.post('/v1/projects/:userId', project.handleAddProject);
app.put('/v1/projects/:projectId', project.handleUpdateProject);
app.delete('/v1/projects/:projectId', project.handleDeleteProject);
// -- not done
app.post('/v1/backlog/:projectId', backlog.handleAddSprintBacklog);
app.put('/v1/backlog/:backlogId', backlog.handleUpdateBacklog);
app.delete('/v1/backlog/:backlogId', backlog.handleDeleteSprintBacklog);
// app.post('/v1/backlog/:projectId', backlog.handleAddBacklog);
// app.put('/v1/backlog/:backlogId', backlog.handleUpdateBacklog);
// app.delete('/v1/backlog/:backlogId', backlog.handleDeleteBacklog);

// --
app.post('/v1/tasks', task.handleAddTask);
app.put('/v1/tasks/:taskId', task.handleUpdateTask);
app.delete('/v1/tasks/:taskId', task.handleDeleteTask);

// -- not done
app.post('/v1/assignments', assignment.handleAddAssignment);
app.put('/v1/assignments/:assignmentId', assignment.handleUpdateAssignment);
app.delete('/v1/assignments/:assignmentId/delete', assignment.handleDeleteAssignment);
// --
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