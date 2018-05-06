import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import LoginPage from 'app_modules/pages/LoginPage';
import MainPage from 'app_modules/pages/MainPage';
import OurApi from 'app_modules/api/OurApi';
import { Cards, Database, ResObjLogin, ResObjProjectsById } from 'app_modules/types';

const initialState = {
    isAuthenticated: false,
    redirectToReferrer: false,
    loginStatus: '',

    // IDs
    userid: 0,
    projectid: 0,

    // Form Shit
    fname: '',
    lname: '',
    displayname: '',
    email: '',
    password: '',
    remember: '',

    // Database
    boardlist: [],
    memberslist: [],
    cards: [],
    projectslist: []
};

type State = Readonly<typeof initialState>;

export class App extends React.Component<{}, State> {
    componentWillMount() {
        let retrievedObject: string | null = localStorage.getItem('kojo');
        if (retrievedObject) {
            this.setState(JSON.parse(retrievedObject), () => this.handleProjectsById());
        }
        this.handleGetDatabase();
    }
    readonly state: State = initialState;
    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        path="/(login|register)"
                        render={(props) => (
                            <LoginPage
                                {...props}
                                handleLogin={this.handleLogin}
                                handleRegister={this.handleRegister}
                                handleLoginFieldChange={this.handleLoginFieldChange}
                                redirectToReferrer={this.state.redirectToReferrer}
                                loginStatus={this.state.loginStatus}
                            />
                        )}
                    />
                    <Route
                        path="/"
                        exact={false}
                        render={(props) =>
                            this.state.isAuthenticated
                                ? (
                                    <MainPage
                                        // IDs
                                        userid={this.state.userid}
                                        projectid={this.state.projectid}
                                        // Database
                                        cards={this.state.cards}
                                        memberslist={this.state.memberslist}
                                        boardlist={this.state.boardlist}
                                        projectslist={this.state.projectslist}
                                        displayName={this.state.displayname}
                                        {...props}
                                        // Handlers
                                        handleAddCard={this.handleAddCard}
                                        handleSaveCard={this.handleSaveCard}
                                        handleDragDropCard={this.handleDragDropCard}
                                        handleLogOut={this.handleLogOut}
                                        handleProjectsById={this.handleProjectsById}

                                    // handleSomething={this.handleSomething}
                                    />
                                ) : (
                                    <Redirect
                                        to={{
                                            pathname: '/login',
                                            state: { from: props.location }
                                        }}
                                    />
                                )
                        }
                    />
                </Switch>
            </Router>
        );
    }

    private handleProjectsById = (): void => {
        OurApi.getProjectsById(this.state.userid, (res: Array<ResObjProjectsById>): void => {
            this.setState(updateAction('projectslist', res), () => console.log(res));
        });
    }

    private handleLogin = (event: React.MouseEvent<HTMLElement>): void => {
        OurApi.authenticate(this.state.email, this.state.password, (res: ResObjLogin): void => {
            console.log('Response: ', res);
            if (res.displayname) {
                // Naive example for development purposes
                if (this.state.remember) {
                    window.localStorage.setItem('kojo', JSON.stringify({
                        displayName: res.displayname,
                        userid: res.user_id,
                        isAuthenticated: true,
                    }));
                }

                this.setState(updateAction('loginStatus', 'Success'), () => {
                    setTimeout(() => {
                        this.setState({
                            email: '',
                            password: '',
                            displayname: res.displayname,
                            userid: res.user_id,
                            isAuthenticated: true,
                            redirectToReferrer: true
                            // tslint:disable-next-line:align
                        }, () => {
                            this.handleGetDatabase();
                            this.handleProjectsById();
                        });
                        // tslint:disable-next-line:align
                    }, 500);

                });

            } else {
                this.setState(updateAction('loginStatus', res.toString()));
            }
        });
    }

    private handleRegister = (event: React.MouseEvent<HTMLElement>): void => {
        const { fname, lname, displayname, email, password } = this.state;
        OurApi.register(fname, lname, displayname, email, password, (res: ResObjLogin): void => {
            console.log(res);
            if (res.displayname) {
                this.setState({
                    password: '',
                    userid: res.user_id,
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
        window.localStorage.clear();
        this.setState({
            isAuthenticated: false,
            redirectToReferrer: false
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
        const newCardObj = {
            ...cards[oldCardIndex] as Cards,
            column: cardColumn
        };

        // If dropping into column directly, set drop card index to +1 value 
        // after the last item of the specific column
        switch (action) {
            case 'DROP_COLUMN':
                dropCardIndex = (cards as Array<Cards>).findIndex(obj => obj.column === cardColumn) + dropCardIndex;
                break;
            case 'DROP_DOWN':
                dropCardIndex++;
                break;
            default:
        }

        // Insert new Card object into Array
        const newCardsArr = [
            ...cards.slice(0, dropCardIndex),
            newCardObj,
            ...cards.slice(dropCardIndex, cards.length)
        ];

        // Delete old Card object from Array
        const deleteIndex = newCardsArr.findIndex(obj => obj === cards[oldCardIndex]);
        const newCardsArr2 = [
            ...newCardsArr.slice(0, deleteIndex),
            ...newCardsArr.slice(deleteIndex + 1, newCardsArr.length)
        ];

        this.setState(updateAction('cards', newCardsArr2));
    }

}

export const updateAction = (
    state: string,
    value: (string | number | Array<Cards> | Array<ResObjProjectsById>)
): ((state: State) => void) =>
    (prevState: State) => ({ [state]: value });

export const updateDatabase = (obj: Database): ((state: State) => void) =>
    (prevState: State) => ({
        boardlist: obj.boards,
        memberslist: obj.users,
        cards: obj.cards
    });

export default App;