import * as React from 'react';
import Navbar from 'app_modules/layout/Navigation';
import Content from 'app_modules/layout/Content';
import { PageProps, ModalProps, GetCards, DragDropCards, Cards } from 'app_modules/types';

interface MainPageProps extends PageProps, ModalProps, GetCards, DragDropCards {
    cards: Array<Cards>;
}

const MainPage: React.SFC<MainPageProps> = (props) => (
    <div className="main">
        <Navbar />
        <Content
            {...props}
        />
    </div>
);

export default MainPage;