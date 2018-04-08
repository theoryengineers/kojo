import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import LoginPage from 'app_modules/pages/LoginPage';
import MainPage from 'app_modules/pages/MainPage';
import OurApi from 'app_modules/api/OurApi';

const initialState = { 
    redirectToReferrer: false,
};

type State = Readonly<typeof initialState>;

export class App extends React.Component<{}, State> {
    readonly state: State = initialState;
    render() {
        return (
            <Router>
            <Switch>
                <Route
                    path="/"
                    exact={true}
                    render={(props) => 
                        OurApi.isAuthenticated ? (
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
                            redirectToReferrer={this.state.redirectToReferrer}
                        />                       
                    )}
                />
            </Switch>
            </Router>
        );
    }

    private handleLogin = (event: React.MouseEvent<HTMLElement>): void => {        
        OurApi.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    }
}

export default App;

// import { PageProps } from 'app_modules/types';

// interface HomePageProps extends PageProps {
//     handleSomething: (() => void);
// }

// const HomePage: React.SFC<HomePageProps> = props => (
//     <div>
//         <h1>Home</h1>
//     </div>
// );
