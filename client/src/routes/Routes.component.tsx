import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Login from 'app_modules/components/Login';
const Test = () => (<div> hi</div>);
const NoMatch = () => (
    <section className="splash-container">
        <p> 404 </p>
    </section>
);

interface MainRoutesProps {
    isAuthenticated?: boolean;
}

export default ({ isAuthenticated }: MainRoutesProps) => (
    <Router>
        <Switch>
            <Route
                path="/(login|register)"
                render={(props) => (
                    <section className="splash-container">
                        <Login {...props} />
                    </section>
                )}
            />
            <Route
                path="/"
                exact={false}
                render={(props) => (
                    isAuthenticated
                        ? (
                            <Test />
                        ) : (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: props.location }
                                }}
                            />
                        )
                )}
            />
            {/*
                <Route
                    path = "/board:id"
                />
            */}
            <Route component={NoMatch} />
        </Switch>
    </Router>
);
