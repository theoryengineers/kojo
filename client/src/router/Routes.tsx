import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Main from 'app_modules/pages/Main';
import Login from 'app_modules/pages/Login';
import PrivateRoute from './PrivateRoute.hoc';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
}

export default () => (
    <Router>
        <Switch>
            <Route
                path="/"
                exact={true}
                component={Home}
            />
            <Route 
                path="/login" 
                component={Login} 
            />
            <PrivateRoute 
                path="/board"
                component={Main} 
            />
        </Switch>    
    </Router>
);