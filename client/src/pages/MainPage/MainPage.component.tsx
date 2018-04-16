import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from 'app_modules/layout/Navigation';
import Content from 'app_modules/layout/Content';
import MembersList from 'app_modules/pages/memberslist';
import TopBar from 'app_modules/layout/TopBarNavigation';
import { PageProps, ModalProps, GetCards, DragDropCards, Cards, DisplayName } from 'app_modules/types';

interface MainPageProps extends PageProps, ModalProps, GetCards, DragDropCards, DisplayName {
    cards: Array<Cards>;
}

const MainPage: React.SFC<MainPageProps> = (props) => (
    <div className="main">
        <Route path="/">
            <Navbar />
        </Route>
        <div>
            <Route path="/">
                <TopBar displayName={props.displayName} />
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
            </Switch>
        </div>

    </div>
);

export default MainPage;