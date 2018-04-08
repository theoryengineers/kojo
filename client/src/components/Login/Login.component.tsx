import * as React from 'react';
import { Link, Route, Redirect,  } from 'react-router-dom';
import { PageProps } from 'app_modules/types';

const initialState = { 
    displayName: '',
    email: '',
    password: ''
};

type State = Readonly<typeof initialState>;

interface Props extends PageProps {
    handleLogin: (e: React.MouseEvent<HTMLElement>) => void;
    redirectToReferrer: boolean;
}

export default class Login extends React.Component<Props, State> {
    readonly state: State = initialState;
    render() {
        const { from } = this.props.location && this.props.location.state || { from: { pathname: '/' } }; 
        
        if (this.props.redirectToReferrer) {
          return <Redirect to={from} />;
        }

        return (
            <div className="login-container">
                <div className="login-header">
                Kojo Kanban 
                {
                    // replace with Avatar later
                }
                </div>
                <div>
                    <Route 
                        path="/auth/register"                      
                        render={() => (
                            <input 
                                className="input-field" 
                                onChange={this.handleFieldChange} 
                                type="text" 
                                placeholder="Display Name" 
                                name="displayName" 
                                required={true} 
                            />)} 
                    />
                    <input 
                        className="input-field" 
                        onChange={this.handleFieldChange} 
                        type="text" 
                        placeholder="Email" 
                        name="email" 
                        required={true} 
                    />
                    <input 
                        className="input-field" 
                        onChange={this.handleFieldChange} 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        required={true} 
                    />
                    
                    <Route 
                        path="/auth/register" 
                        render={() => (
                            <button 
                                className="login-button" 
                                // onClick={() => this.onSubmit('register')}
                            >
                                Register
                            </button>)} 
                    />
                    <Route 
                        path="/auth/login" 
                        render={() => (
                            <div>
                                <button 
                                    className="login-button" 
                                    onClick={this.props.handleLogin}
                                >
                                Login
                                </button>
                                <label><input type="checkbox" name="remember" readOnly={true} /> Stay Logged In</label>
                            </div>
                        )} 
                    />
                </div>
                
                <Route 
                    path="/auth/register" 
                    render={() => (
                        <div className="login-footer">              
                            <span className="psw">
                                Already have an <Link className="link" to={'login'}>account</Link>?
                            </span>
                        </div>
                    )} 
                />
                <Route 
                    path="/auth/login" 
                    render={() => (
                        <div className="login-footer">
                            <span className="psw">Forgot <a href="">password</a>?</span><br />
                            <span className="psw">
                                Don't have an <Link className="link" to={'register'}>account</Link>?
                            </span>
                        </div>
                    )} 
                />
            </div>
        );
    }

    private handleFieldChange = (event: React.FormEvent<HTMLInputElement>): void => {           
        this.setState(updateField(event));
    }
}

const updateField = (event: React.FormEvent<HTMLInputElement>): (state: State) => void =>
    (prevState: State) => ({[event.currentTarget.name]: event.currentTarget.value});