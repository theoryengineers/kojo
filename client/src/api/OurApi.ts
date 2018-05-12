import { ResObjLogin, ResObjProjectsById } from 'app_modules/types';

const rootUrl = 'http://localhost:5500/api/v1';

export class Auth {
    public static isAuthenticated: boolean = false;

    public static async authenticate(
        email: string,
        password: string,
        cb: (res: ResObjLogin) => void
    ) {
        try {
            const response: Response = await fetch(`${rootUrl}/login`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async register(
        fname: string,
        lname: string,
        displayname: string,
        email: string,
        password: string,
        cb: (res: ResObjLogin) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/register`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fname: fname,
                    lname: lname,
                    displayname: displayname,
                    email: email,
                    password: password
                })
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static signout(cb: () => void) {
        this.isAuthenticated = false;
    }
}

export class User {
    public static async getAllUsers(
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/users`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async getUserById(
        userid: number,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/user/${userid}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async removeUserById(
        userid: number,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/user/${userid}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }
}

export class Project {
    public static async addProject(
        userid: number,
        projectName: string,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/user/${userid}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectName
                })
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async editProject(
        projectid: number,
        projectName: string,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectName
                })
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async deleteProject(
        projectid: number,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async getProjectById(
        projectid: number,
        cb: (res: Array<ResObjProjectsById>) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async getAllProjects(
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/projects`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async getAllProjectsByUserId(
        userid: number,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/projects/user/${userid}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }
}

export class ProjectAssignment {
    public static async addAssignUser(
        projectid: number,
        newUsers: Array<number>,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/assign`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    newUsers
                })
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async removeAssignUser(
        projectid: number,
        delUsers: Array<number>,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/assign`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async getAllAssignUsers(
        projectid: number,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/assign`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }
}

export class ProjectSprint {
    public static async addSprint(
        projectid: number,
        sprintName: string,
        sprintDescription: string,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/sprint`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sprintName,
                    sprintDescription
                })
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async editSprint(
        projectid: number,
        sprintid: number,
        sprintName: string,
        sprintDescription: string,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/sprint/${sprintid}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sprintName,
                    sprintDescription
                })
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async deleteSprint(
        projectid: number,
        sprintid: number,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/sprint/${sprintid}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async getSprintById(
        projectid: number,
        sprintid: number,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/sprint/${sprintid}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async getSprintByProjectId(
        projectid: number,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/sprint`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }
}

export class Story {
    public static async addStory(
        projectid: number,
        storyFromClient: {},
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/story`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    storyFromClient
                })
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async addStoryToSprint(
        projectid: number,
        sprintid: number,
        storyFromClient: {},
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/sprint/${sprintid}/story`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    storyFromClient
                })
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async editStory(
        projectid: number,
        storyid: number,
        storyFromClient: {},
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/story/${storyid}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    storyFromClient
                })
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async editStoryInSprint(
        projectid: number,
        sprintid: number,
        storyid: number,
        storyFromClient: {},
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/sprint/${sprintid}/story`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    storyFromClient
                })
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async deleteStory(
        projectid: number,
        storyid: number,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/story/${storyid}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async getStory(
        projectid: number,
        storyid: number,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/story/${storyid}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async getAllStoriesByProjectId(
        projectid: number,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/stories`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }

    public static async getAllStoriesBySprintId(
        projectid: number,
        sprintid: number,
        cb: (res: {}) => void
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/sprint/${sprintid}/stories`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' }
            });
            const resObj = await response.json();
            cb(resObj);
        } catch (err) {
            console.log(err);
        }
    }
}