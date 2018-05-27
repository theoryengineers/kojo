import { Api } from 'app_modules/services/OurApi';
import { UserStore } from './UserStore';
import { AuthenticationStore } from './AuthenticationStore';
import { ProjectsStore } from './ProjectStore';

export class RootStore {
    Api = new Api();
    AuthenticationStore = new AuthenticationStore(this);
    UserStore = new UserStore(this);
    ProjectStore = new ProjectsStore(this);
}
