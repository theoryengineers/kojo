import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { RouteComponentProps } from 'react-router-dom';
// import MainPage from '../components/MainPage';
import Content from '../components/Content';
import Login from '../components/Login';

const Test = () => (
    <div>
        here
    </div>
);

const Home = () => ( 
    <div>
        <ul>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/login">Login</Link>
            </li>
            <li>
            <Link to="/register">Register</Link>
            </li>
        </ul>
    </div>  
);


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
                path="/"
                exact={true}
                render={(props) => (
                    <Home />
                )}
            />
            <Route
                path="/(login|register)"
                render={(props) => (
                    <section className="splash-container">
                        <Login />
                    </section>
                )}
            />
            <Route
                path="/other"
                exact={true}
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
            
            <Route
                path = "/:projectId"
                render={(props) => (
                    <Content {...props} />
                )}
            />
           
            <Route component={NoMatch} />
        </Switch>
    </Router>
);

// interface MatchParams {
//     id: number;
//     project: number;
// }

// interface ChildProps extends RouteComponentProps<MatchParams> {
// }

// class Child extends React.Component<ChildProps, {}> {
//     constructor(props) {
//         super(props);
//     }

//     componentDidMount() {
//         console.log(this.props.match.params);
//     }

//     render() {
//         const { match } = this.props;
//         return (
//             <div>
//                 <h3>ID: {match.params.id}</h3>
//                 <h3>ID: {match.params.project}</h3>
//             </div>
//         )
//     }
// }

