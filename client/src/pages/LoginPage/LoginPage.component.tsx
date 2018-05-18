import * as React from 'react';
import Login from 'app_modules/components/Login';
import { PageProps } from 'app_modules/types';

interface LoginPageProps extends PageProps {

}

const LoginPage: React.SFC<LoginPageProps> = (props) => (
    <div className="splash-container">
        <Login />
    </div>
);

export default LoginPage;