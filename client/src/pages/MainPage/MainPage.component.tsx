import * as React from 'react';
import Navbar from 'app_modules/layout/Navigation';
import Content from 'app_modules/layout/Content';
import { PageProps, CardProps } from 'app_modules/types';

interface MainPageProps extends PageProps, CardProps { }

const MainPage: React.SFC<MainPageProps> = (props) => (
    <div className="main">
        <Navbar />
        <Content
            {...props}
            handleGetCards={props.handleGetCards}
        />
    </div>
);

export default MainPage;