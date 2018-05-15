import { inject } from 'mobx-react';
import Routes from './Routes.component';
import { Stores, UserStore } from 'app_modules/stores';

export default inject( ({ UserStore }: Stores) => {
    const { isAuthenticated } = UserStore as UserStore;
    return {
        isAuthenticated
    }
})(Routes);