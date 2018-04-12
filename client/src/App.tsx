import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import LoginPage from 'app_modules/pages/LoginPage';
import MainPage from 'app_modules/pages/MainPage';
import OurApi from 'app_modules/api/OurApi';
import { Cards } from 'app_modules/types';

const initialState = {
    isAuthenticated: false,
    redirectToReferrer: false,
    displayName: '',
    email: '',
    password: '',
    remember: '',
    cards: []
};

type State = Readonly<typeof initialState>;

export class App extends React.Component<{}, State> {
    componentWillMount() {
        let retrievedObject: string | null = localStorage.getItem('kojo');
        if (retrievedObject) {
            this.setState(JSON.parse(retrievedObject));
        }
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
                                <MainPage
                                    {...props}
                                    handleGetCards={this.handleGetCards}
                                    handleAddCard={this.handleAddCard}
                                    handleSaveCard={this.handleSaveCard}
                                    cards={this.state.cards}
                                // handleSomething={this.handleSomething}
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
        });
    }

    private handleLoginFieldChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const { name, value } = event.currentTarget;
        this.setState(updateField(name, value));
    }

    private handleGetCards = (): void => {
        let cards = OurApi.getCards();
        this.setState(updateCards(cards), () => console.log(this.state.cards));
    }

    private handleAddCard = (newCardObj: Cards): void => {
        this.setState(addCards(newCardObj), () => console.log(this.state.cards));
    }

    private handleSaveCard = (cardObj: Cards, cardIndex: number): void => {
        let newCardsArr =
            this.state.cards.slice(0, cardIndex).concat(
                ([cardObj] as Array<never>).concat(
                    this.state.cards.slice(cardIndex + 1, this.state.cards.length)
                )
            );
        this.setState(updateCards(newCardsArr));
    }
}

const updateField = (name: string, value: string): (state: State) => void =>
    (prevState: State) => ({ [name]: value });

const addCards = (newCardObj: Cards): (state: State) => void =>
    (prevState: State) => ({ cards: ([newCardObj] as Array<never>).concat(prevState.cards) });

const updateCards = (cardsArr: Array<Cards>): (state: State) => void =>
    (prevState: State) => ({ cards: cardsArr });

export default App;