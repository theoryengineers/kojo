import UserControls from './User';
import LoginControls from './Login';
import ProjectControls from './Project';
import BacklogControls from './Backlog';
import TaskControls from './Task';
import SprintControls from './Sprint';
import AssignmentControls from './Assignment';
import RegisterControls from './Register';

class Controllers {
    db;
    login;
    user;
    register;
    project;
    backlog;
    task;
    sprint;
    assignment;
    constructor(knex) {
        this.db = knex;
        this.login = new LoginControls(this);
        this.register = new RegisterControls(this);
        this.user = new UserControls(this);
        this.project = new ProjectControls(this);
        this.backlog = new BacklogControls(this);
        this.task = new TaskControls(this);
        this.sprint = new SprintControls(this);
        this.assignment = new AssignmentControls(this);
    }
}

export default Controllers;