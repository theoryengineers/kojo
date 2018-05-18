import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import MainPage from 'app_modules/pages/MainPage';
import LoginPage from 'app_modules/pages/LoginPage';
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
                        <LoginPage />
                    </section>
                )}
            />
            <Route
                path="/"
                exact={false}
                render={(props) => (
                    isAuthenticated
                        ? (
                            <MainPage />
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
