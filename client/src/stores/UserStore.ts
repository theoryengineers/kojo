import { observable } from 'mobx';

export class UserStore {
    @observable userid = 0;
    @observable displayname = '';
    @observable email = '';
    @observable isAuthenticated = false;
}