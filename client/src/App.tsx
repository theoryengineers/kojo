import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import LoginPage from 'app_modules/pages/LoginPage';
import MainPage from 'app_modules/pages/MainPage';
import * as Api from 'app_modules/api/OurApi';
import { Cards, Database, ResObjLogin, ResObjProjectsById } from 'app_modules/types';

const initialState = {
    isAuthenticated: false,
    redirectToReferrer: false,
    loginStatus: '',

    // IDs
    userid: 0,
    projectid: 0,
    sprintid: 0,
    storyid: 0,

    // Form Shit
    fname: '',
    lname: '',
    displayname: '',
    email: '',
    password: '',
    remember: '',

    // Api Shit
    projectName: '',
    sprintName: '',
    sprintDescription: '',
    storyTitle: '',
    storyCategory: '',
    storyDescription: '',
    storyOrder: 0,
    projectAssignArr: [],

    // Database
    memberslist: [],
    projectslist: [],
    boardlist: [],
    sprintslist: [],
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
                                        handleDragDropCard={this.handleDragDropCard}
                                        handleLogOut={this.handleLogOut}
                                    // handleGetAllUsers={this.handleGetAllUsers}
                                    // handleGetUserById={this.handleGetUserById}
                                    // handleRemoveUserById={this.handleRemoveUserById}
                                    // handleAddProject={this.handleAddProject}
                                    // handleEditProject={this.handleEditProject}
                                    // handleDeleteProject={this.handleDeleteProject}
                                    // handleGetProjectById={this.handleGetProjectById}
                                    // handleGetAllProjects={this.handleGetAllProjects}
                                    // handleGetAllProjectsByUserId={this.handleGetAllProjectsByUserId}
                                    // handleAddProjectAssignment={this.handleAddProjectAssignment}
                                    // handleRemoveProjectAssignment={this.handleRemoveProjectAssignment}
                                    // handleGetAllProjectAssignment={this.handleGetAllProjectAssignment}
                                    // handleAddSprint={this.handleAddSprint}
                                    // handleEditSprint={this.handleEditSprint}
                                    // handleDeleteSprint={this.handleDeleteSprint}
                                    // handleGetSprintById={this.handleGetSprintById}
                                    // handleGetSprintByProjectId={this.handleGetSprintByProjectId}

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

    //////////////////////////////////////////////////////////////////////////////////////////////

    private handleLoginFieldChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const { name, value } = event.currentTarget;
        this.setState(updateAction(name, value));
    }

    /* DRAG AND DROP */

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
                dropCardIndex = (cards as Array<Cards>)
                    .findIndex(obj => obj.column === cardColumn) + dropCardIndex;
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

    ////////////////////
    /// API HANDLERS ///
    ////////////////////

    // AUTHORIZATION

    private handleLogin = (event: React.MouseEvent<HTMLElement>): void => {
        const { email, password } = this.state;
        Api.Auth.authenticate(email, password, (res: ResObjLogin): void => {
            console.log(res);
            if (res.displayname) {
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
        Api.Auth.register(fname, lname, displayname, email, password, (res: ResObjLogin): void => {
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

    private handleLogOut = (): void => {
        window.localStorage.clear();
        this.setState({
            isAuthenticated: false,
            redirectToReferrer: false
        });
    }
    /*
    // USER

    private handleGetAllUsers = (): void => {
        Api.User.getAllUsers((res: any): void => {
            console.log(res);
        });
    }

    private handleGetUserById = (event: React.MouseEvent<HTMLElement>): void => {
        const { userid } = this.state;
        Api.User.getUserById(userid, (res: any): void => {
            console.log(res);
        });
    }

    private handleRemoveUserById = (event: React.MouseEvent<HTMLElement>): void => {
        const { userid } = this.state;
        Api.User.removeUserById(userid, (res: any): void => {
            console.log(res);
        });
    }

    // PROJECT

    private handleAddProject = (event: React.MouseEvent<HTMLElement>): void => {
        const { userid, projectName } = this.state;
        Api.Project.addProject(userid, projectName, (res: any): void => {
            console.log(res);
        });
    }

    private handleEditProject = (event: React.MouseEvent<HTMLElement>): void => {
        const { projectid, projectName } = this.state;
        Api.Project.editProject(projectid, projectName, (res: any): void => {
            console.log(res);
        });
    }

    private handleDeleteProject = (event: React.MouseEvent<HTMLElement>): void => {
        const { projectid } = this.state;
        Api.Project.deleteProject(projectid, (res: any): void => {
            console.log(res);
        });
    }

    private handleGetProjectById = (event: React.MouseEvent<HTMLElement>): void => {
        const { projectid } = this.state;
        Api.Project.getProjectById(projectid, (res: any): void => {
            console.log(res);
        });
    }

    private handleGetAllProjects = (event: React.MouseEvent<HTMLElement>): void => {
        Api.Project.getAllProjects((res: any): void => {
            console.log(res);
        });
    }

    private handleGetAllProjectsByUserId = (event: React.MouseEvent<HTMLElement>): void => {
        const { userid } = this.state;
        Api.Project.getAllProjectsByUserId(userid, (res: any): void => {
            console.log(res);
        });
    }

    // PROJECT ASSIGNMENT

    private handleAddProjectAssignment = (event: React.MouseEvent<HTMLElement>): void => {
        const { projectid, projectAssignArr } = this.state;
        Api.ProjectAssignment.addAssignUser(projectid, projectAssignArr, (res: any): void => {
            console.log(res);
        });
    }

    private handleRemoveProjectAssignment = (event: React.MouseEvent<HTMLElement>): void => {
        const { projectid, projectAssignArr } = this.state;
        Api.ProjectAssignment.removeAssignUser(projectid, projectAssignArr, (res: any): void => {
            console.log(res);
        });
    }

    private handleGetAllProjectAssignment = (event: React.MouseEvent<HTMLElement>): void => {
        const { projectid } = this.state;
        Api.ProjectAssignment.getAllAssignUsers(projectid, (res: any): void => {
            console.log(res);
        });
    }

    // PROJECT SPRINT

    private handleAddSprint = (event: React.MouseEvent<HTMLElement>): void => {
        const { projectid, sprintName, sprintDescription } = this.state;
        Api.ProjectSprint.addSprint(projectid, sprintName, sprintDescription, (res: any): void => {
            console.log(res);
        });
    }

    private handleEditSprint = (event: React.MouseEvent<HTMLElement>): void => {
        const { projectid, sprintid, sprintName, sprintDescription } = this.state;
        Api.ProjectSprint.editSprint(projectid, sprintid, sprintName, sprintDescription, (res: any): void => {
            console.log(res);
        });
    }

    private handleDeleteSprint = (event: React.MouseEvent<HTMLElement>): void => {
        const { projectid, sprintid } = this.state;
        Api.ProjectSprint.deleteSprint(projectid, sprintid, (res: any): void => {
            console.log(res);
        });
    }

    private handleGetSprintById = (): void => {
        const { projectid, sprintid } = this.state;
        Api.ProjectSprint.getSprintById(projectid, sprintid, (res: any): void => {
            console.log(res);
        });
    }

    private handleGetSprintByProjectId = (): void => {
        const { projectid } = this.state;
        Api.ProjectSprint.getSprintByProjectId(projectid, (res: any): void => {
            console.log(res);
        });
    }

    // STORY/TASK

    private handleAddStory = (cardObj: Cards): void => {
        const { projectid, storyTitle, storyCategory, storyDescription, storyOrder } = this.state;
        const storyFromClient = {
            storyTitle,
            storyCategory,
            storyDescription,
            storyOrder
        };
        Api.Story.addStory(projectid, storyFromClient, (res: any): void => {
            console.log(res);
        });
        this.setState(updateAction('cards', [cardObj].concat(this.state.cards)));
    }

    private handleAddStoryToSprint = (): void => {
        const { projectid, sprintid, storyTitle, storyCategory, storyDescription, storyOrder } = this.state;
        const storyFromClient = {
            storyTitle,
            storyCategory,
            storyDescription,
            storyOrder
        };
        Api.Story.addStoryToSprint(projectid, sprintid, storyFromClient, (res: any): void => {
            console.log(res);
        });
    }

    private handleEditStory = (cardObj: Cards, cardIndex: number): void => {
        const { cards, projectid, storyid, storyTitle, storyCategory, storyDescription, storyOrder } = this.state;
        const storyFromClient = {
            storyTitle,
            storyCategory,
            storyDescription,
            storyOrder
        };
        Api.Story.editStory(projectid, storyid, storyFromClient, (res: any): void => {
            console.log(res);
        });

        this.setState(updateAction('cards', [
            ...cards.slice(0, cardIndex),
            ...[cardObj],
            ...cards.slice(cardIndex + 1)
        ]));
    }

    private handleEditStoryInSprint = (): void => {
        const { projectid, sprintid, storyid, storyTitle, storyCategory, storyDescription, storyOrder } = this.state;
        const storyFromClient = {
            storyTitle,
            storyCategory,
            storyDescription,
            storyOrder
        };
        Api.Story.editStoryInSprint(projectid, sprintid, storyid, storyFromClient, (res: any): void => {
            console.log(res);
        });
    }

    private handleDeleteStory = (): void => {
        const { projectid, storyid } = this.state;
        Api.Story.deleteStory(projectid, storyid, (res: any): void => {
            console.log(res);
        });
    }

    private handleGetStory = (): void => {
        const { projectid, storyid } = this.state;
        Api.Story.getStory(projectid, storyid, (res: any): void => {
            console.log(res);
        });
    }

    private handleGetAllStoriesByProjectId = (): void => {
        const { projectid } = this.state;
        Api.Story.getAllStoriesByProjectId(projectid, (res: any): void => {
            console.log(res);
        });
    }

    private handleGetAllStoriesBySprintId = (): void => {
        const { projectid, sprintid } = this.state;
        Api.Story.getAllStoriesBySprintId(projectid, sprintid, (res: any): void => {
            console.log(res);
        });
    }
    */
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