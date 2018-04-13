import * as React from 'react';
import Column from 'app_modules/components/BoardColumn';
import Card from 'app_modules/components/BoardCard';
import Modal from 'app_modules/components/Modal';
import TopBar from 'app_modules/layout/TopBarNavigation';
import { Cards, GetCards, ModalProps } from 'app_modules/types';

const initialState = {
    currentModal: 'CLOSED',
    card: {
        id: 0,
        title: '',
        category: '',
        description: '',
        column: '',
        assignment: [0],
        board: 0
    },
    cardIndex: 0
};

interface Props extends GetCards, ModalProps {
    cards: Array<Cards>;
}

type State = Readonly<typeof initialState>;

export default class Content extends React.Component<Props, State> {
    readonly state: State = initialState;
    render() {
        const { currentModal } = this.state;
        const { handleGetCards, cards, handleAddCard, handleSaveCard } = this.props;
        return (
            <div>
                <TopBar displayName={'Partner'} />
                <div className="content">
                    <Column
                        header={'Backlog'}
                        backgroundColor={'gray'}
                        rightButton={<button onClick={() => this.handleModal('ADD_NEW_CARD')}>+</button>}
                    >
                        {cards.map((card, i) => {
                            return <Card
                                key={i}
                                card={card}
                                index={i}
                                colorCode={'red'}
                                handleEditCard={this.handleEditCard}
                            />;
                        })}
                    </Column>
                    <Column
                        header={'In Progress'}
                        backgroundColor={'blue'}
                        rightButton={<button onClick={() => handleGetCards()}>+</button>}
                    />
                    <Column header={'Testing'} backgroundColor={'red'} />
                    <Column header={'Complete'} backgroundColor={'green'} />
                </div>
                <Modal
                    currentModal={currentModal}
                    handleModal={this.handleModal}
                    handleAddCard={handleAddCard}
                    handleSaveCard={handleSaveCard}
                    card={this.state.card}
                    cardIndex={this.state.cardIndex}
                />
            </div>
        );
    }

    private handleModal = (selection: string): void => {
        this.setState({
            currentModal: selection
        });
    }

    private handleEditCard = (selection: string = 'EDIT_CARD', cardObj: Cards, index: number): void => {
        this.setState({
            currentModal: selection,
            card: cardObj,
            cardIndex: index
            // tslint:disable-next-line:align
        }, () => console.log(this.state.card));
    }
}