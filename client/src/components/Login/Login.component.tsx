import * as React from 'react';
import { Link, Route, Redirect, } from 'react-router-dom';
import { PageProps } from 'app_modules/types';

interface Props extends PageProps {
    handleLogin: (e: React.MouseEvent<HTMLElement>) => void;
    handleRegister: (e: React.MouseEvent<HTMLElement>) => void;
    redirectToReferrer: boolean;
    handleLoginFieldChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Login: React.SFC<Props> = (props) => {
    const { from } = props.location && props.location.state || { from: { pathname: '/' } };

    if (props.redirectToReferrer) {
        return <Redirect to={from} />;
    }

    return (
        <div className="login">
            <div className="login__header">
                Kojo Kanban
                {
                    // replace with Avatar later
                }
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
                                placeholder="Name"
                                name="name"
                                required={true}
                            />
                            <input
                                className="login__input-field"
                                onChange={props.handleLoginFieldChange}
                                type="text"
                                placeholder="Username"
                                name="displayName"
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
                                Stay Logged In
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