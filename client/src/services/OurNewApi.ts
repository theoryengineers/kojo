export class Api {  
    constructor(private rootUrl='http://localhost:5500/api/v1') {
        // this.Auth = new Auth(rootUrl);
    }

    private async request(method: string, path: string, body?: any) {
        try {          
            const response = await fetch(path, {
                headers: { 'Content-Type': 'application/json' },
                method,
                body: body ? JSON.stringify(body) : undefined
            });
            return await response.json();
        } catch (err) {
            return err;           
        }
    }

    // Authentication
    public authenticate( email: string, password: string) {     
        return this.request('post', `${this.rootUrl}/login`, { email, password });      
    }

    public register(
        fname: string, 
        lname: string, 
        displayname: string, 
        email: string, 
        password: string
    ) {
        return this.request('post', `${this.rootUrl}/register`, {
            fname,
            lname,
            displayname,
            email,
            password
        });
    }

    // User
    public getAllUsers() {
        return this.request('get', `${this.rootUrl}/users`);
    } 

    public getUserById(userid: number) {
        return this.request('get', `${this.rootUrl}/user/${userid}`);
    }

    public removeUserById(userid: number) {        
        return this.request('delete', `${this.rootUrl}/user/${userid}`);
    }

    // Projects
    public addProject(userid: number, projectName: string) {
        return this.request('post', `${this.rootUrl}/project/user/${userid}`, { projectName });
    }

    public deleteProject(projectid: number) {
        return this.request('delete', `${this.rootUrl}/project/${projectid}`)
    }

    public editProject(projectid: number, projectName: string) {
        return this.request('put', `${this.rootUrl}/project/${projectid}`, { projectName });
    }

    public getProjectById(projectid: number) {
        return this.request('get', `${this.rootUrl}/project/${projectid}`)
    }

    public getAllProjects() {
        return this.request('get', `${this.rootUrl}/projects`);
    }

    public getAllProjectsByUserId(userid: number) {
        return this.request('get', `${this.rootUrl}/projects/user/${userid}`)
    }
}