import { inject } from 'mobx-react';
import Login from './Login.component';
import { Stores, AuthenticationStore } from 'app_modules/stores';

// tslint:disable-next-line:no-shadowed-variable
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
})(Login);