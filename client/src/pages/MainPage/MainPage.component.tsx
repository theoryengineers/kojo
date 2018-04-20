import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from 'app_modules/layout/Navigation';
import Content from 'app_modules/layout/Content';
import MembersList from 'app_modules/pages/memberslist';
import TopBar from 'app_modules/layout/TopBarNavigation';
import { PageProps, ModalProps, DragDropCards, Boards, Memberslist, Cards, DisplayName } from 'app_modules/types';

interface MainPageProps extends
    PageProps,
    ModalProps,
    DragDropCards,
    DisplayName {
    cards: Array<Cards>;
    boardlist: Array<Boards>;
    memberslist: Array<Memberslist>;
    handleLogOut: () => void;
}

const MainPage: React.SFC<MainPageProps> = (props) => (
    <div className="main">
        <Route path="/main">
            <Navbar />
        </Route>
        <div>
            <Route path="/main">
                <TopBar displayName={props.displayName} handleLogOut={props.handleLogOut} />
            </Route>
            <Switch>
                <Route exact={true} path="/main">
                    <Content
                        {...props}
                    />
                </Route>
                <Route path="/main/memberslist">
                    <MembersList
                        {...props}
                    />
                </Route>
            </Switch>
        </div>

    </div>
);

export default MainPage;