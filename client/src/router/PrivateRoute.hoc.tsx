import * as React from 'react';
import {
    Route,
    Redirect,
    RouteComponentProps,
    RouteProps
} from 'react-router-dom';
import OurApi from 'app_modules/api/OurApi';

const PrivateRoute: React.SFC<RouteProps> = ({ component: Component, ...rest }) => {
    if (!Component) {
      return null;
    }
    return (
      <Route
        {...rest}
        render={(props: RouteComponentProps<{}>) => 
            OurApi.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect 
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )}
      />
    );
};

export default PrivateRoute;