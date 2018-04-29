import * as React from 'react';
import Column from 'app_modules/components/BoardColumn';
import Card from 'app_modules/components/BoardCard';
import Modal from 'app_modules/components/Modal';
import DragAndDrop from 'app_modules/layout/DragAndDrop';
import { Cards, ModalProps, DragDropCards, DisplayName } from 'app_modules/types';

const initialState = {
    currentModal: '',
    card: {
        id: 0,
        title: '',
        category: '',
        description: '',
        column: '',
        assignment: [0],
        boardid: 0
    },
    cardIndex: 0,
    columnDisplay: {
        backlog: true,
        inProgress: true,
        testing: true,
        complete: true
    },
    columnCount: 4
};

interface Props extends ModalProps, DragDropCards, DisplayName {
    cards: Array<Cards>;
}

type State = Readonly<typeof initialState>;

export default class Content extends React.Component<Props, State> {
    readonly state: State = initialState;
    render() {
        const { currentModal, columnDisplay } = this.state;
        const {
            cards,
            handleAddCard,
            handleSaveCard,
            handleDragDropCard
        } = this.props;

        return (
            <div>
                <div className="content-bar">
                    <label
                        className={
                            columnDisplay.backlog
                                ? 'on'
                                : 'off'
                        }
                    >
                        <input
                            name="backlog"
                            type="checkbox"
                            checked={this.state.columnDisplay.backlog}
                            onChange={this.handleColumnDisplay}
                        />
                        Backlog
                    </label>
                    <label
                        className={
                            columnDisplay.inProgress
                                ? 'on'
                                : 'off'
                        }
                    >
                        <input
                            name="inProgress"
                            type="checkbox"
                            checked={this.state.columnDisplay.inProgress}
                            onChange={this.handleColumnDisplay}
                        />
                        In Progress
                    </label>
                    <label
                        className={
                            columnDisplay.testing
                                ? 'on'
                                : 'off'
                        }
                    >
                        <input
                            name="testing"
                            type="checkbox"
                            checked={this.state.columnDisplay.testing}
                            onChange={this.handleColumnDisplay}
                        />
                        Testing
                    </label>
                    <label
                        className={
                            columnDisplay.complete
                                ? 'on'
                                : 'off'
                        }
                    >
                        <input
                            name="complete"
                            type="checkbox"
                            checked={this.state.columnDisplay.complete}
                            onChange={this.handleColumnDisplay}
                        />
                        Complete
                    </label>
                </div>
                <div className="content" style={{ gridTemplateColumns: 'repeat(' + this.state.columnCount + ', 1fr)' }}>
                    <Column
                        header={'Backlog'}
                        backgroundColor={'gray'}
                        rightButton={<button onClick={() => this.handleModal('ADD_NEW_CARD')}>+</button>}
                        handleDragDropCard={handleDragDropCard}
                        display={this.state.columnDisplay.backlog}
                    >
                        {cards.map((card, i) => {
                            if (card.column === 'Backlog') {
                                return <DragAndDrop key={i} handleDragDropCard={handleDragDropCard}>
                                    <Card
                                        key={i}
                                        index={i}
                                        card={card}
                                        colorCode={'#CC0000'}
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
                        backgroundColor={'royalblue'}
                        handleDragDropCard={handleDragDropCard}
                        display={this.state.columnDisplay.inProgress}
                    >
                        {cards.map((card, i) => {
                            if (card.column === 'In Progress') {
                                return <DragAndDrop key={i} handleDragDropCard={handleDragDropCard}>
                                    <Card
                                        key={i}
                                        index={i}
                                        card={card}
                                        colorCode={'#CC0000'}
                                        handleEditCard={this.handleEditCard}
                                    />
                                </DragAndDrop>;
                            } else {
                                return null;
                            }
                        })}
                    </Column>
                    <Column
                        header={'Testing'}
                        backgroundColor={'#B20000'}
                        handleDragDropCard={handleDragDropCard}
                        display={this.state.columnDisplay.testing}
                    >
                        {cards.map((card, i) => {
                            if (card.column === 'Testing') {
                                return <DragAndDrop key={i} handleDragDropCard={handleDragDropCard}>
                                    <Card
                                        key={i}
                                        index={i}
                                        card={card}
                                        colorCode={'#CC0000'}
                                        handleEditCard={this.handleEditCard}
                                    />
                                </DragAndDrop>;
                            } else {
                                return null;
                            }
                        })}
                    </Column>
                    <Column
                        header={'Complete'}
                        backgroundColor={'forestgreen'}
                        handleDragDropCard={handleDragDropCard}
                        display={this.state.columnDisplay.complete}
                    >
                        {cards.map((card, i) => {
                            if (card.column === 'Complete') {
                                return <DragAndDrop key={i} handleDragDropCard={handleDragDropCard}>
                                    <Card
                                        key={i}
                                        index={i}
                                        card={card}
                                        colorCode={'#CC0000'}
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

    private handleColumnDisplay = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            columnDisplay: {
                ...this.state.columnDisplay,
                [e.currentTarget.name]: e.currentTarget.checked
            },
            columnCount: (e.currentTarget.checked ? this.state.columnCount + 1 : this.state.columnCount - 1)
        });
    }
}