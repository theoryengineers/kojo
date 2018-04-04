import * as React from 'react';
import { BrowserRouter as Router, Route, /*Link, RouteComponentProps,*/ Switch, Redirect } from 'react-router-dom';
import Main from 'app_modules/pages/main';
import Splash from 'app_modules/layout/splash';

interface Props {}

interface State {
    isLoggedIn: boolean;
}

export class App extends React.Component<Props, State> {
    state = {
        isLoggedIn: false
    };

    onChangeLoggedInState = (isLoggedIn: boolean): void => {
        this.setState({
            isLoggedIn
        });
    }

    render() {
        const { isLoggedIn } = this.state;
        return (
            <Router>
                <Switch>
                    <Route 
                        exact={true} 
                        path="/" 
                        render={() => (
                            isLoggedIn 
                                ?   <Main />
                                :   <Redirect to="/login" />
                        )} 
                    />
                    <Route 
                        path="/" 
                        render={() => 
                            <Splash 
                                onLoggedInProp={this.onChangeLoggedInState}
                            />
                        }
                    />
                </Switch>    
            </Router>
        );
    }
}

export default App;