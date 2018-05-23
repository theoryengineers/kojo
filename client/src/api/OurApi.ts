const rootUrl = 'http://localhost:5500/api/v1';

export class Api {
    auth = new Auth();
    user = new User();
    project = new Project();
    projassign = new ProjectAssignment();
    projsprint = new ProjectSprint();
    story = new Story();
}

class Auth {
    isAuthenticated: boolean = false;

    public async authenticate(
        email: string,
        password: string,
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
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async register(
        fname: string,
        lname: string,
        displayname: string,
        email: string,
        password: string,
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
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public signout(cb: () => void) {
        this.isAuthenticated = false;
    }
}

class User {
    public async getAllUsers() {
        try {
            const response = await fetch(`${rootUrl}/users`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async getUserById(
        userid: number
    ) {
        try {
            const response = await fetch(`${rootUrl}/user/${userid}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async removeUserById(
        userid: number
    ) {
        try {
            const response = await fetch(`${rootUrl}/user/${userid}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }
}

class Project {
    assignment = new ProjectAssignment();
    sprint = new ProjectSprint();
    story = new Story();

    public async addProject(
        userid: number,
        projectName: string
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/user/${userid}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectName
                })
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async editProject(
        projectid: number,
        projectName: string
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectName
                })
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async deleteProject(
        projectid: number
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async getProjectById(
        projectid: number,
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async getAllProjects() {
        try {
            const response = await fetch(`${rootUrl}/projects`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async getAllProjectsByUserId(
        userid: number
    ) {
        try {
            const response = await fetch(`${rootUrl}/projects/user/${userid}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }
}

class ProjectAssignment {
    public async addAssignUser(
        projectid: number,
        newUsers: Array<{ user_id: number, user_role: string }>
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/assign`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    newUsers
                })
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async removeAssignUser(
        projectid: number,
        delUsers: Array<number>
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/assign`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async getAllAssignUsers(
        projectid: number
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/assign`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }
}

class ProjectSprint {
    story = new Story();

    public async addSprint(
        projectid: number,
        sprintName: string,
        sprintDescription: string
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
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async editSprint(
        projectid: number,
        sprintid: number,
        sprintName: string,
        sprintDescription: string
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
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async deleteSprint(
        projectid: number,
        sprintid: number
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/sprint/${sprintid}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async getSprintById(
        projectid: number,
        sprintid: number
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/sprint/${sprintid}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async getSprintByProjectId(
        projectid: number
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/sprint`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }
}

class Story {
    public async addStory(
        projectid: number,
        storyFromClient: {}
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/story`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    storyFromClient
                })
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async addStoryToSprint(
        projectid: number,
        sprintid: number,
        storyFromClient: {}
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/sprint/${sprintid}/story`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    storyFromClient
                })
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async editStory(
        projectid: number,
        storyid: number,
        storyFromClient: {}
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/story/${storyid}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    storyFromClient
                })
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async editStoryInSprint(
        projectid: number,
        sprintid: number,
        storyid: number,
        storyFromClient: {}
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/sprint/${sprintid}/story`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    storyFromClient
                })
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async deleteStory(
        projectid: number,
        storyid: number
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/story/${storyid}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async getStory(
        projectid: number,
        storyid: number
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/story/${storyid}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async getAllStoriesByProjectId(
        projectid: number
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/stories`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    public async getAllStoriesBySprintId(
        projectid: number,
        sprintid: number
    ) {
        try {
            const response = await fetch(`${rootUrl}/project/${projectid}/sprint/${sprintid}/stories`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    }
}