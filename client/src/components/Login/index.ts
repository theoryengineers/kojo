import { inject } from 'mobx-react';
import Routes from './Login.component';
import { Stores, AuthenticationStore } from 'app_modules/stores';

export default inject(({ AuthenticationStore }: Stores) => {
    const {
        redirectToReferrer,
        handleLoginFieldChange,
        loginStatus,
        handleRegister,
        handleLogin
    } = AuthenticationStore as AuthenticationStore;
    return {
        handleLoginFieldChange,
        redirectToReferrer,
        loginStatus,
        handleRegister,
        handleLogin
    };
})(Routes);