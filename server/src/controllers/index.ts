import UserControls from './User';
import LoginControls from './Login';
import ProjectControls from './Project';
import BacklogControls from './Backlog';
import TaskControls from './Task';
import AssignmentControls from './Assignment';
import RegisterControls from './Register';
import InitializeControls from './Initialize';

class Controllers {
    db;
    login;
    user;
    register;
    project;
    backlog;
    task;
    assignment;
    initialize;
    constructor(knex) {
        this.db = knex;
        this.login = new LoginControls(this);
        this.register = new RegisterControls(this);
        this.user = new UserControls(this);
        this.project = new ProjectControls(this);
        this.backlog = new BacklogControls(this);
        this.task = new TaskControls(this);
        this.assignment = new AssignmentControls(this);
        this.initialize = new InitializeControls(this);
    }
}

export default Controllers;