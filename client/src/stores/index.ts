import { configure } from 'mobx';
import { RootStore } from './RootStore';

export { UserStore } from './UserStore';
export { AuthenticationStore } from './AuthenticationStore';
export { RootStore as Stores };

configure({ enforceActions: true });

export function createStore() {
    return new RootStore();
}
