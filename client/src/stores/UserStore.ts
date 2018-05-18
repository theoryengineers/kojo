import { observable, computed, action } from 'mobx';
import { RootStore } from './RootStore';

export class UserStore {
    Parent: RootStore;
    @observable userid: number = 1;
    @observable displayname: string = '';
    @observable email: string = '';
    @observable isAuthenticated: boolean = true;

    constructor(parent: RootStore) {
        this.Parent = parent;
    }

    @computed
    get Api() {
        return this.Parent.Api;
    }

    @action.bound
    async handleGetAllUsers(): Promise<void> {
        this.Api.user.getAllUsers();
    }

    @action.bound
    async handleGetUserById(e: React.MouseEvent<HTMLElement>): Promise<void> {
        const res = await this.Api.user.getUserById(this.userid);
        console.log(res);
    }

    @action.bound
    async handleRemoveUserById(e: React.MouseEvent<HTMLElement>): Promise<void> {
        this.Api.user.removeUserById(this.userid);
    }
}