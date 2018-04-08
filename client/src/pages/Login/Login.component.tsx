import * as React from 'react';
import { Redirect, RouteProps } from 'react-router-dom';
import OurApi from 'app_modules/api/OurApi';

const initialState = { 
    redirectToReferrer: false,
    displayName: '',
    email: '',
    password: '',
    stayLoggedIn: false,
};

type State = Readonly<typeof initialState>;

export default class Login extends React.Component<RouteProps, State>  {
    readonly state: State = initialState;
    render() {
      const { from } = this.props.location && this.props.location.state || { from: { pathname: '/' } };   
      const { redirectToReferrer } = this.state;
  
      if (redirectToReferrer) {
        return <Redirect to={from} />;
      }
  
      return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <form>
              <fieldset>
                    <legend>Login</legend>
                    <label>Email</label>
                    <input                        
                            type="email"
                            placeholder="Email"
                            name="email"
                            required={true}
                            onChange={this.handleFieldChange}
                    />
                    <label>Password</label>
                    <input 
                        type="password"
                        placeholder="Password"
                        name="password"
                        required={true}
                        onChange={this.handleFieldChange}
                    />
                </fieldset>
                <button onClick={this.handleLogin}>Log in</button>
            </form>
        </div>
      );
    }

    private handleFieldChange = (event: React.FormEvent<HTMLInputElement>): void => {           
        this.setState(updateField);
    }
  
    private handleLogin = (event: React.MouseEvent<HTMLElement>): void => {        
        OurApi.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    }
}

const updateField = (event: React.FormEvent<HTMLInputElement>) => 
    (prevState: State) => ({[event.currentTarget.name]: event.currentTarget.value});