import * as React from 'react';
import { Redirect, RouteProps } from 'react-router-dom';
import OurApi from 'app_modules/api/OurApi';

const initialState = { 
    redirectToReferrer: false,
    displayName: '',
    email: '',
    password: '',
    stayLoggedIn: false,
    showRegistration: false
};

type State = Readonly<typeof initialState>;

export default class Login extends React.Component<RouteProps, State>  {
    readonly state: State = initialState;
    render() {
      const { from } = this.props.location && this.props.location.state || { from: { pathname: '/' } };   
      const { redirectToReferrer, showRegistration } = this.state;
  
      if (redirectToReferrer) {
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
            <p>You must log in to view the page: {from.pathname}</p>
            <form>
              <fieldset>
                    <legend>{showRegistration ? 'Register' : 'Login'}</legend>
                    { showRegistration &&
                    <input 
                        className="input-field"                       
                        type="text" 
                        placeholder="Display Name" 
                        name="displayName" 
                        required={true}
                        onChange={this.handleFieldChange}
                    /> 
                    }
                    <input
                        className="input-field"                   
                        type="email"
                        placeholder="Email"
                        name="email"
                        required={true}
                        onChange={this.handleFieldChange}
                    />               
                    <input
                        className="input-field" 
                        type="password"
                        placeholder="Password"
                        name="password"
                        required={true}
                        onChange={this.handleFieldChange}
                    />
                </fieldset>
                <button onClick={this.handleLogin}>Log in</button>
            </form>
            <div className="login-footer">
                <span className="psw">Forgot <a href="#">password</a>?</span><br />
                <span className="psw">Don't have an 
                    <button onClick={this.handleShowRegistration}>account</button>?
                </span>
            </div>
        </div>
      );
    }

    private handleShowRegistration = (event: React.MouseEvent<HTMLElement>): void => {
        this.setState(toggleRegistration);
    }

    private handleFieldChange = (event: React.FormEvent<HTMLInputElement>): void => {           
        this.setState(updateField(event));
    }
  
    private handleLogin = (event: React.MouseEvent<HTMLElement>): void => {        
        OurApi.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    }
}

const toggleRegistration = (prevState: State) => 
    ({ showRegistration: !prevState.showRegistration});
const updateField = (event: React.FormEvent<HTMLInputElement>): (state: State) => void =>
    (prevState: State) => ({[event.currentTarget.name]: event.currentTarget.value});