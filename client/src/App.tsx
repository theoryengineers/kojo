import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import LoginPage from 'app_modules/pages/LoginPage';
import MainPage from 'app_modules/pages/MainPage';
import OurApi from 'app_modules/api/OurApi';
import { Cards, Database } from 'app_modules/types';

const initialState = {
    isAuthenticated: false,
    redirectToReferrer: false,
    displayName: '',
    email: '',
    password: '',
    remember: '',
    boardlist: [],
    memberslist: [],
    cards: []
};

type State = Readonly<typeof initialState>;

export class App extends React.Component<{}, State> {
    componentWillMount() {
        let retrievedObject: string | null = localStorage.getItem('kojo');
        if (retrievedObject) {
            this.setState(JSON.parse(retrievedObject));
        }
        this.handleGetDatabase();
    }
    readonly state: State = initialState;
    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        path="/"
                        exact={true}
                        render={(props) =>
                            this.state.isAuthenticated ? (
                                <Redirect
                                    to={{
                                        pathname: '/main'
                                    }}
                                />
                            ) : (
                                    <Redirect
                                        to={{
                                            pathname: '/auth/login',
                                            state: { from: props.location }
                                        }}
                                    />
                                )
                        }
                    />
                    <Route
                        path="/main"
                        render={(props) => (
                            <MainPage
                                cards={this.state.cards}
                                memberslist={this.state.memberslist}
                                boardlist={this.state.boardlist}
                                {...props}
                                handleAddCard={this.handleAddCard}
                                handleSaveCard={this.handleSaveCard}
                                handleDragDropCard={this.handleDragDropCard}
                                handleLogOut={this.handleLogOut}
                                displayName={this.state.displayName}

                            // handleSomething={this.handleSomething}
                            />
                        )}
                    />
                    <Route
                        path="/auth"
                        render={(props) => (
                            <LoginPage
                                {...props}
                                handleLogin={this.handleLogin}
                                handleLoginFieldChange={this.handleLoginFieldChange}
                                redirectToReferrer={this.state.redirectToReferrer}
                            />
                        )}
                    />
                </Switch>
            </Router>
        );
    }

    private handleLogin = (event: React.MouseEvent<HTMLElement>): void => {
        OurApi.authenticate(this.state.email, this.state.password, (displayName: string): void => {
            if (displayName) {
                // Naive example for development purposes
                if (this.state.remember) {
                    window.localStorage.setItem('kojo', JSON.stringify({
                        displayName,
                        isAuthenticated: true,
                    }));
                }

                this.setState({
                    email: '',
                    password: '',
                    displayName,
                    isAuthenticated: true,
                    redirectToReferrer: true
                });
            }
        });
    }

    private handleLoginFieldChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const { name, value } = event.currentTarget;
        this.setState(updateAction(name, value));
    }

    private handleLogOut = (): void => {
        const { displayName } = this.state;
        window.localStorage.setItem('kojo', JSON.stringify({
            displayName,
            isAuthenticated: false,
        }));
        this.setState({
            isAuthenticated: false
        });
    }

    private handleGetDatabase = (): void => {
        const db = OurApi.getDatabase();

        const boardlist = db.boards;
        const memberslist = db.users;
        const cards = db.cards.sort((a, b) => {
            if (a.column > b.column) {
                return 1;
            } else if (a.column < b.column) {
                return -1;
            } else {
                return 0;
            }
        });

        this.setState(updateDatabase(
            {
                boards: boardlist,
                cards: cards,
                users: memberslist
            }
        ));
    }

    private handleAddCard = (cardObj: Cards): void => {
        this.setState(updateAction('cards', [cardObj].concat(this.state.cards)));
    }

    private handleSaveCard = (cardObj: Cards, cardIndex: number): void => {
        const cards = this.state.cards;

        this.setState(updateAction('cards', [
            ...cards.slice(0, cardIndex),
            ...[cardObj],
            ...cards.slice(cardIndex + 1)
        ]));
    }

    private handleDragDropCard = (
        oldCardIndex: number, // the index of the card being dragged
        dropCardIndex: number, // the index of the card being hovered over
        cardColumn: string, // the drop zone column name
        action: string // the action to place card above or below the drop target card
    ): void => {
        const { cards } = this.state;
        const newCardObj = { ...cards[oldCardIndex] as Cards, column: cardColumn };

        // If dropping into column directly, set drop card index to +1 value 
        // after the last item of the specific column
        switch (action) {
            case 'DROP_COLUMN':
                dropCardIndex = dropCardIndex + (cards as Array<Cards>).findIndex(obj => obj.column === cardColumn);
                break;
            case 'DROP_DOWN':
                dropCardIndex++;
                break;
            default:
        }

        // Insert new Card object into Array
        const newCardsArr =
            cards
                .slice(0, dropCardIndex)
                .concat(
                    ([newCardObj] as Array<never>),
                    cards.slice(dropCardIndex, cards.length)
                );

        // Delete old Card object from Array
        const deleteIndex = newCardsArr.findIndex(obj => obj === cards[oldCardIndex]);
        const newCardsArr2 =
            newCardsArr
                .slice(0, deleteIndex)
                .concat(
                    newCardsArr.slice(deleteIndex + 1, newCardsArr.length)
                );

        this.setState(updateAction('cards', newCardsArr2));
    }

}

export const updateAction = (state: string, value: (string | number | Array<Cards>)): ((state: State) => void) =>
    (prevState: State) => ({ [state]: value });

export const updateDatabase = (object: Database): ((state: State) => void) =>
    (prevState: State) => ({
        boardlist: object.boards,
        memberslist: object.users,
        cards: object.cards
    });

export default App;