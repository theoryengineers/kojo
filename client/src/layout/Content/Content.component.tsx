import * as React from 'react';
import Column from 'app_modules/components/BoardColumn';
import Card from 'app_modules/components/BoardCard';

export default () => (
    <div className="content">
        <Column
            header={'Backlog'} 
            backgroundColor={'gray'}
        >
            <Card
                title={'Create Cards'}
                category={'Frontend/Component'}
                // tslint:disable-next-line:max-line-length
                description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                assignment={'Paul Allen'}
                colorCode={'darkred'}
            />
            <Card
               title={'Create User API'}
               category={'Backend/API'}
                // tslint:disable-next-line:max-line-length
               description={'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
               assignment={'Steve Wozniak'}
               colorCode={'purple'}
            />
        </Column>
        <Column header={'In Progress'} backgroundColor={'blue'}>
            <Card
                title={'Navbar'}
                category={'Frontend/Component'}
                // tslint:disable-next-line:max-line-length
                description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                assignment={'Patrick Bateman'}
                colorCode={'darkred'}
            />
            <Card
                title={'Bake Chicken'}
                category={'Kitchen/Oven'}
                // tslint:disable-next-line:max-line-length
                description={'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
                assignment={'P.F. Chang'}
                colorCode={'yellow'}
            />
        </Column>
        <Column header={'Testing'} backgroundColor={'red'} />
        <Column header={'Complete'} backgroundColor={'green'} />
    </div>
);