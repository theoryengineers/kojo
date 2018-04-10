import * as React from 'react';
import Column from 'app_modules/components/BoardColumn';
import Card from 'app_modules/components/BoardCard';
import Modal from 'app_modules/components/Modal';
import CardForm from 'app_modules/components/CardForm';

const initialState = {
    openModal: false
};

type State = Readonly<typeof initialState>;

export default class Content extends React.Component {
    readonly state: State = initialState;
    render() {
        const { openModal } = this.state;
        return (
            <div className="content">
                <Column
                    header={'Backlog'}
                    backgroundColor={'gray'}
                    rightButton={<button onClick={() => this.handleOpenModal(true)}>+</button>}
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
                <Modal show={openModal}>
                    <CardForm handleOpenModal={this.handleOpenModal} />
                </Modal>
            </div>
        );
    }

    private handleOpenModal = (openClose: boolean): void => {
        this.setState({
            openModal: openClose
        });
    }
}