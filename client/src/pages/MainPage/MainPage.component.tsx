import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from 'app_modules/layout/Navigation';
import Content from 'app_modules/pages/Content';
import MembersList from 'app_modules/pages/MembersList';
import Projects from 'app_modules/pages/ProjectsPage';
import TopBar from 'app_modules/layout/TopBarNavigation';
import {
    PageProps, ModalProps, DragDropCards, Boards, Memberslist, Cards, DisplayName,
    ResObjProjectsById
} from 'app_modules/types';

interface MainPageProps extends
    PageProps,
    ModalProps,
    DragDropCards,
    DisplayName {
    // ID
    userid: number;
    projectid: number;
    // Database
    cards: Array<Cards>;
    boardlist: Array<Boards>;
    memberslist: Array<Memberslist>;
    projectslist: Array<ResObjProjectsById>;
    // Handlers
    handleLogOut: () => void;
}

const MainPage: React.SFC<MainPageProps> = (props) => (
    <div className="main">
        <Route path="/">
            <Navbar />
        </Route>
        <div>
            <Route path="/">
                <TopBar {...props} />
            </Route>
            <Switch>
                <Route exact={true} path="/">
                    <Content
                        {...props}
                    />
                </Route>
                <Route path="/memberslist">
                    <MembersList
                        {...props}
                    />
                </Route>
                <Route path="/projects">
                    <Projects
                        {...props}
                    />
                </Route>
            </Switch>
        </div>
    </div>
);

export default MainPage;