import { Api } from 'app_modules/api/';
import { UserStore } from './UserStore';
import { AuthenticationStore } from './AuthenticationStore';

export class RootStore {
    Api = Api;
    AuthenticationStore = new AuthenticationStore(this);
    UserStore = new UserStore();
}
