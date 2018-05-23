import { observable, computed, action, runInAction } from 'mobx';
import { RootStore } from './RootStore';

export class ProjectsStore {
    Parent: RootStore;
    @observable projects: ProjectStore[] = [];
    @observable projectid: number = 0;
    @observable projectname: string = '';
    @observable newAssignments: AssignmentStore[] = [];
    @observable delAssignments: number[] = [];

    constructor(parent: RootStore) {
        this.Parent = parent;
    }

    @computed
    get Api() {
        return this.Parent.Api;
    }

    @computed
    get UserStore() {
        return this.Parent.UserStore;
    }

    @action
    handleOnFieldChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { name, value } = e.currentTarget;
        this[name] = value;

    }

    @action.bound
    public async handleAddProject(): Promise<void> {
        const { projectname } = this;
        const { userid } = this.UserStore;

        const res = await this.Api.project.addProject(userid, projectname);

        runInAction(() => {
            this.projects.push(new ProjectStore(res.project_id, res.project_name, res.created_on));
        });
    }

    @action
    public handleEditProjectButton = (id: number, name: string): void => {
        this.projectname = name;
        this.projectid = id;
    }

    @action.bound
    public async handleEditProject(): Promise<void> {
        await this.Api.project.editProject(this.projectid, this.projectname);
        const editIdx = this.projects.findIndex(project => project.projectid === this.projectid);
        const newProjArrs = [
            ...this.projects.slice(0, editIdx),
            new ProjectStore(this.projectid, this.projectname, this.projects[editIdx].createdon),
            ...this.projects.slice(editIdx + 1, this.projects.length)
        ];
        runInAction(() => {
            this.projects = newProjArrs;
        });
    }

    @action.bound
    public async handleDeleteProject(projectid: number): Promise<void> {
        await this.Api.project.deleteProject(projectid);
        const delIdx = this.projects.findIndex(project => project.projectid === projectid);
        const newProjArrs = [
            ...this.projects.slice(0, delIdx),
            ...this.projects.slice(delIdx + 1, this.projects.length)
        ];
        runInAction(() =>
            this.projects = newProjArrs
        );
    }

    @action.bound
    public async handleGetProjectById(): Promise<void> {
        const { projectid } = this;
        const res = await this.Api.project.getProjectById(projectid);
        console.log(res);
    }

    @action.bound
    public async handleGetAllProjects(): Promise<void> {
        const res = await this.Api.project.getAllProjects();
        console.log(res);
        // tslint:disable-next-line:no-any
        this.projects.push(res.map((x: any) => {
            return new ProjectStore(x.project_id, x.project_name, x.created_on);
        }));
    }

    @action.bound
    public async handleGetAllProjectsByUserId(): Promise<void> {
        const { userid } = this.UserStore;
        let res = await this.Api.project.getAllProjectsByUserId(userid);
        runInAction(() => {
            // tslint:disable-next-line:no-any
            this.projects = res.map((x: any) => {
                return new ProjectStore(x.project_id, x.project_name, x.created_on);
            });
        });
    }

    // ASSIGNMENT HANDLERS

    @action.bound
    public handleAddProjAssignButton(userid: number, userRole: string): void {
        this.newAssignments.push(new AssignmentStore(userid, userRole));
        console.log('newAssignments:', ...this.newAssignments);
    }

    @action.bound
    public async handleAddProjectAssignment(event: React.MouseEvent<HTMLElement>): Promise<void> {
        const { projectid, newAssignments } = this;

        const newAssignmentForApi = newAssignments.map(x => {
            return {
                user_id: x.userid,
                user_role: x.userRole
            };
        });

        const res = await this.Api.projassign.addAssignUser(projectid, newAssignmentForApi);
        console.log(res);
    }

    @action.bound
    public async handleRemoveProjectAssignment(event: React.MouseEvent<HTMLElement>): Promise<void> {
        const { projectid, delAssignments } = this;
        const res = await this.Api.projassign.removeAssignUser(projectid, delAssignments);
        console.log(res);
    }

    @action.bound
    public async handleGetAllProjectAssignment(event: React.MouseEvent<HTMLElement>): Promise<void> {
        const { projectid } = this;
        const res = await this.Api.projassign.getAllAssignUsers(projectid);
        console.log(res);
    }
}

export class ProjectStore {
    projectid: number;
    projectname: string;
    createdon: string;

    constructor(id: number, name: string, createdon: string) {
        this.projectid = id;
        this.projectname = name;
        this.createdon = createdon;
    }
}

export class AssignmentStore {
    @observable userid: number;
    @observable userRole: string;

    constructor(userid: number, userrole: string) {
        this.userid = userid;
        this.userRole = userrole;
    }
}

export class SprintStore {
    @observable sprint: {
        sprintid: number;
        sprintname: string;
        sprintdescription: string;
    };

    constructor(id: number, name: string, desc: string) {
        this.sprint = {
            sprintid: id,
            sprintname: name,
            sprintdescription: desc
        };
    }
}