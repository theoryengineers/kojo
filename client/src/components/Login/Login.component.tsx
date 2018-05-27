import * as React from 'react';
import { Link, Route, Redirect, RouteProps } from 'react-router-dom';
const logo = require('app_modules/assets/logo.svg');

interface Props extends RouteProps {
    handleLogin?: (e: React.MouseEvent<HTMLElement>) => void;
    handleRegister?: (e: React.MouseEvent<HTMLElement>) => void;
    redirectToReferrer?: boolean;
    handleLoginFieldChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    loginStatus?: string;
}

const Login: React.SFC<Props> = (props) => {
    const { from } = props.location && props.location.state || { from: { pathname: '/' } };

    if (props.redirectToReferrer) {
        return <Redirect to={from} />;
    }

    return (
        <div className="login">
            <div className="login__header">
                <div className="login__header__logo">
                    <img src={logo} />
                </div>
            </div>
            <div>
                <Route
                    path="/register"
                    render={() => (
                        <>
                            <input
                                className="login__input-field"
                                onChange={props.handleLoginFieldChange}
                                type="text"
                                placeholder="First Name"
                                name="fname"
                                required={true}
                            />
                            <input
                                className="login__input-field"
                                onChange={props.handleLoginFieldChange}
                                type="text"
                                placeholder="Last Name"
                                name="lname"
                                required={true}
                            />
                            <input
                                className="login__input-field"
                                onChange={props.handleLoginFieldChange}
                                type="text"
                                placeholder="Display Name"
                                name="displayname"
                                required={true}
                            />
                        </>)}
                />
                <input
                    className="login__input-field"
                    onChange={props.handleLoginFieldChange}
                    type="text"
                    placeholder="Email"
                    name="email"
                    required={true}
                />
                <input
                    className="login__input-field"
                    onChange={props.handleLoginFieldChange}
                    type="password"
                    placeholder="Password"
                    name="password"
                    required={true}
                />

                <Route
                    path="/register"
                    render={() => (
                        <button
                            className="login__button"
                            onClick={props.handleRegister}
                        >
                            Register
                        </button>)}
                />
                <Route
                    path="/login"
                    render={() => (
                        <div>
                            <div
                                className={'login__status ' +
                                    (props.loginStatus === 'Success'
                                        ? 'login__status__success'
                                        : 'login__status__fail'
                                    )
                                }
                            >
                                {props.loginStatus}
                            </div>
                            <button
                                className="login__button"
                                onClick={props.handleLogin}
                            >
                                Login
                            </button>
                            <label>
                                <input
                                    onChange={props.handleLoginFieldChange}
                                    type="checkbox"
                                    name="remember"
                                    readOnly={true}
                                />
                                Stay Logged
                            </label>
                        </div>
                    )}
                />
            </div>

            <Route
                path="/register"
                render={() => (
                    <div className="login__footer">
                        <span className="psw">
                            Already have an <Link className="link" to={'login'}>account</Link>?
                        </span>
                    </div>
                )}
            />
            <Route
                path="/login"
                render={() => (
                    <div className="login__footer">
                        <span className="psw">Forgot <a href="">password</a>?</span><br />
                        <span className="psw">
                            Don't have an <Link className="link" to={'register'}>account</Link>?
                        </span>
                    </div>
                )}
            />
        </div>
    );

};

export default Login;