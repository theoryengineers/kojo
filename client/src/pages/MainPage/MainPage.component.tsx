import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from 'app_modules/layout/Navigation';
import Content from 'app_modules/layout/Content';
import MembersList from 'app_modules/pages/memberslist';
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
    userid: number;
    cards: Array<Cards>;
    boardlist: Array<Boards>;
    memberslist: Array<Memberslist>;
    projectslist: Array<ResObjProjectsById>;
    handleLogOut: () => void;
    handleProjectsById: () => void;
}

const MainPage: React.SFC<MainPageProps> = (props) => (
    <div className="main">
        <Route path="/main">
            <Navbar />
        </Route>
        <div>
            <Route path="/main">
                <TopBar {...props} />
            </Route>
            <Switch>
                <Route path="/main/board">
                    <Content
                        {...props}
                    />
                </Route>
                <Route path="/main/memberslist">
                    <MembersList
                        {...props}
                    />
                </Route>
                <Route path="/main/projects">
                    <Projects
                        {...props}
                    />
                </Route>
            </Switch>
        </div>
    </div>
);

export default MainPage;