import { 
    observable, 
    action, 
    computed, 
    runInAction
} from 'mobx';
import { RootStore } from './RootStore';

export class AuthenticationStore {
    @observable Parent: RootStore;
    @observable redirectToReferrer = false;
    @observable loginStatus = '';
    @observable fname = '';
    @observable lname = '';
    @observable displayname = '';
    @observable email = '';
    @observable password = '';
    @observable remember = '';

    constructor(parent: RootStore) {
        this.Parent = parent;
    }

    @computed
    get UserStore() {
        return this.Parent.UserStore;
    }

    @computed
    get Api() {
        return this.Parent.Api;
    }

    @action
    handleRegister = () => {

    }

    @action
    handleLoginFieldChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const { name, value } = event.currentTarget;
        this[name] = value; 
    }

    @action.bound
    async handleLogin() {
        const email = this.email;
        const password = this.password;
        const res = await this.Api.authenticate(email, password);

        if (res.displayname) {
            runInAction(() => {
                this.email = '';
                this.password = '';
                this.displayname = res.displayname;
                this.UserStore.id = res.user_id;
                this.UserStore.isAuthenticated = true;
                this.redirectToReferrer = true;
                this.loginStatus = 'Success';
            }); 
        } else {
            runInAction(() => {
                this.loginStatus = res.toString();
            });           
        } 
    }
}