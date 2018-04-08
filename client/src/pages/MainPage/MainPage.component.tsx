import * as React from 'react';
import Navbar from 'app_modules/layout/Navigation';
import Content from 'app_modules/layout/Content';
import { PageProps } from 'app_modules/types';

interface MainPageProps extends PageProps {}

const MainPage: React.SFC<MainPageProps> = (props) => (
    <div className="main">
        <Navbar />
        <Content />
    </div>
);

export default MainPage;