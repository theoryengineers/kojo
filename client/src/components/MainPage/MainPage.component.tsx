import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from 'app_modules/components/Navigation';
// import Content from 'app_modules/components/Content';
import MembersList from 'app_modules/components/MembersList';
import Projects from 'app_modules/components/ProjectsPage';
import TopBar from 'app_modules/components/TopBarNavigation';

interface MainPageProps {

}

const MainPage: React.SFC<MainPageProps> = (props) => (
    <div className="main">
        <Route path="/">
            <Navbar />
        </Route>
        <div>
            <Route path="/">
                <TopBar />
            </Route>
            <Switch>
                {/* <Route exact={true} path="/">
                     <Content /> 
                </Route> */}
                <Route path="/memberslist">
                    <MembersList />
                </Route>
                <Route path="/projects">
                    <Projects />
                </Route>
            </Switch>
        </div>
    </div>
);

export default MainPage;