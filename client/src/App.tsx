import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import LoginPage from 'app_modules/pages/LoginPage';
import MainPage from 'app_modules/pages/MainPage';
import OurApi from 'app_modules/api/OurApi';

const initialState = {
    isAuthenticated: false,
    redirectToReferrer: false,
    displayName: '',
    email: '',
    password: '',
    remember: ''
};

type State = Readonly<typeof initialState>;

export class App extends React.Component<{}, State> {
    componentWillMount() {
        let retrievedObject: string | null = localStorage.getItem('kojo');
        if (retrievedObject) {            
            this.setState(JSON.parse(retrievedObject));
        } 
    }
    readonly state: State = initialState;
    render() {
        return (
            <Router>
            <Switch>
                <Route
                    path="/"
                    exact={true}
                    render={(props) => 
                        this.state.isAuthenticated ? (
                            <MainPage
                                {...props} 
                                // handleSomething={this.handleSomething}
                            />
                        ) : (
                            <Redirect 
                                to={{
                                    pathname: '/auth/login',
                                    state: { from: props.location }
                                }}
                            />
                        )   
                    }
                />
                <Route
                    path="/auth"                  
                    render={(props) => (                        
                        <LoginPage
                            {...props}
                            handleLogin={this.handleLogin}
                            handleLoginFieldChange={this.handleLoginFieldChange}
                            redirectToReferrer={this.state.redirectToReferrer}
                        />                       
                    )}
                />
            </Switch>
            </Router>
        );
    }

    private handleLogin = (event: React.MouseEvent<HTMLElement>): void => {        
        OurApi.authenticate(this.state.email, this.state.password, (displayName) => {
            // Naive example for development purposes
            if (this.state.remember) {
                window.localStorage.setItem('kojo', JSON.stringify({
                    displayName,
                    isAuthenticated: true,
                }));
            }

            this.setState({
                email: '',
                password: '', 
                displayName,
                isAuthenticated: true,
                redirectToReferrer: true 
            });
        });
    }

    private handleLoginFieldChange = (event: React.FormEvent<HTMLInputElement>): void => {           
        const { name, value } = event.currentTarget;
        this.setState(updateField(name, value));
    }
}

const updateField = (name: string, value: string): (state: State) => void =>
    (prevState: State) => ({[name]: value});

export default App;