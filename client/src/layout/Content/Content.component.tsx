import * as React from 'react';
import Column from 'app_modules/components/BoardColumn';
import Card from 'app_modules/components/BoardCard';
import Modal from 'app_modules/components/Modal';
import TopBar from 'app_modules/layout/TopBarNavigation';
import DragAndDrop from 'app_modules/layout/DragAndDrop';
import { Cards, GetCards, ModalProps, DragDropCards } from 'app_modules/types';

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

interface Props extends GetCards, ModalProps, DragDropCards {
    cards: Array<Cards>;
}

type State = Readonly<typeof initialState>;

export default class Content extends React.Component<Props, State> {
    readonly state: State = initialState;
    render() {
        const { currentModal } = this.state;
        const {
            cards,
            handleGetCards,
            handleAddCard,
            handleSaveCard,
            handleDragDropCard
        } = this.props;

        return (
            <div>
                <TopBar displayName={'Partner'} />
                <div className="content">
                    <Column
                        header={'Backlog'}
                        backgroundColor={'gray'}
                        rightButton={<button onClick={() => this.handleModal('ADD_NEW_CARD')}>+</button>}
                        handleDragDropCard={handleDragDropCard}
                    >
                        {cards.map((card, i) => {
                            if (card.column === 'Backlog') {
                                return <DragAndDrop key={i} handleDragDropCard={handleDragDropCard}>
                                    <Card
                                        key={i}
                                        index={i}
                                        card={card}
                                        colorCode={'red'}
                                        handleEditCard={this.handleEditCard}
                                    />
                                </DragAndDrop>;
                            } else {
                                return null;
                            }
                        })}
                    </Column>
                    <Column
                        header={'In Progress'}
                        backgroundColor={'blue'}
                        rightButton={<button onClick={() => handleGetCards()}>+</button>}
                        handleDragDropCard={handleDragDropCard}
                    >
                        {cards.map((card, i) => {
                            if (card.column === 'In Progress') {
                                return <DragAndDrop key={i} handleDragDropCard={handleDragDropCard}>
                                    <Card
                                        key={i}
                                        index={i}
                                        card={card}
                                        colorCode={'red'}
                                        handleEditCard={this.handleEditCard}
                                    />
                                </DragAndDrop>;
                            } else {
                                return null;
                            }
                        })}
                    </Column>
                    <Column header={'Testing'} backgroundColor={'red'} handleDragDropCard={handleDragDropCard}>
                        {cards.map((card, i) => {
                            if (card.column === 'Testing') {
                                return <DragAndDrop key={i} handleDragDropCard={handleDragDropCard}>
                                    <Card
                                        key={i}
                                        index={i}
                                        card={card}
                                        colorCode={'red'}
                                        handleEditCard={this.handleEditCard}
                                    />
                                </DragAndDrop>;
                            } else {
                                return null;
                            }
                        })}
                    </Column>
                    <Column header={'Complete'} backgroundColor={'green'} handleDragDropCard={handleDragDropCard}>
                        {cards.map((card, i) => {
                            if (card.column === 'Complete') {
                                return <DragAndDrop key={i} handleDragDropCard={handleDragDropCard}>
                                    <Card
                                        key={i}
                                        index={i}
                                        card={card}
                                        colorCode={'red'}
                                        handleEditCard={this.handleEditCard}
                                    />
                                </DragAndDrop>;
                            } else {
                                return null;
                            }
                        })}
                    </Column>
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