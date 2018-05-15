import { action, computed, observable, runInAction } from 'mobx';
import { RootStore } from './RootStore';
import * as Types from 'app_modules/types';

export class AuthenticationStore {
    @observable Parent: RootStore;
    @observable redirectToReferrer = false;
    @observable loginStatus = '';
    @observable fname = '';
    @observable lname = '';
    @observable displayname = '';
    @observable email = '';
    @observable password = '';
    @observable remember = false;

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
    handleLoginFieldChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const { name, value } = event.currentTarget;
        this[name] = value;
    }

    @action.bound
    async handleRegister() {
        const fname = this.fname;
        const lname = this.lname;
        const displayname = this.displayname;
        const password = this.password;
        const email = this.email;
        const res: [Types.UserRes, Types.ProjectRes] =
            await this.Api.register(fname, lname, displayname, email, password);
        console.log(res);

        if (res[0].displayname) {
            runInAction(() => {
                this.UserStore.email = res[0].email;
                this.password = '';
                this.UserStore.displayname = res[0].displayname;
                this.UserStore.userid = res[0].user_id;
                this.UserStore.isAuthenticated = true;
                this.redirectToReferrer = true;
            });
        } else {
            runInAction(() => {
                this.loginStatus = res.toString();
            });
        }
    }

    @action.bound
    async handleLogin() {
        const email = this.email;
        const password = this.password;
        const res: [Types.UserRes, [Types.ProjectRes]] =
            await this.Api.authenticate(email, password);
        console.log(res);

        if (res[0].displayname) {
            runInAction(() => {
                this.email = '';
                this.password = '';
                this.displayname = res[0].displayname;
                this.UserStore.userid = res[0].user_id;
                this.UserStore.isAuthenticated = true;
                this.redirectToReferrer = true;
                this.loginStatus = 'Success';

                if (this.remember) {
                    window.localStorage.setItem('kojo', JSON.stringify({
                        displayName: res[0].displayname,
                        userid: res[0].user_id,
                        isAuthenticated: true,
                    }));
                }
            });
        } else {
            runInAction(() => {
                this.loginStatus = res.toString();
            });
        }
    }
}