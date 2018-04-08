import * as React from 'react';
import Login from 'app_modules/components/Login';
import { PageProps } from 'app_modules/types';

interface LoginPageProps extends PageProps {
    handleLogin: (e: React.MouseEvent<HTMLElement>) => void;
    redirectToReferrer: boolean;
}

const LoginPage: React.SFC<LoginPageProps> = (props) => (
    <div className="splash-container">
        <Login
            {...props} 
            handleLogin={props.handleLogin}
            redirectToReferrer={props.redirectToReferrer}
        />
    </div>
);

export default LoginPage;