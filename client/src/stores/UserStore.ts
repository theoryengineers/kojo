import { observable } from 'mobx';

export class UserStore {
    @observable id = 0;
    @observable isAuthenticated = false;
}