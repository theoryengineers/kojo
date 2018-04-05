import * as React from 'react';
import { BrowserRouter as Router, Route, /*Link, RouteComponentProps,*/ Switch, Redirect } from 'react-router-dom';
import Main from 'view/pages/main';
import Splash from 'view/layout/splash';

interface Item {
    id: number;
    size: number;
}

interface Props {}

interface State {
    isLoggedIn: boolean;
    items: {
        [key: string]: Item
    };
}

export class App extends React.Component<Props, State> {
    state: State = {
        isLoggedIn: false,
        items: {
            'a': {
                id: 1,
                size: 10
            },
            'b': {
                id: 2,
                size: 34
            }
        }
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