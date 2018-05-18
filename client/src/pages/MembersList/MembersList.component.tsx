import * as React from 'react';

const initialState = {
    userid: 0,
    userrole: ''
};

interface Props {
    handleAddProjAssignButton?: (userid: number, userRole: string) => void;
    handleAddProjectAssignment?: (event: React.MouseEvent<HTMLElement>) => void;
}

type State = Readonly<typeof initialState>;

export default class MembersList extends React.Component<Props, State> {
    readonly state: State = initialState;
    render() {
        return (
            <div className="memberslist">
                <input name="userid" onChange={this.handleOnFieldChange} placeholder={'userid'} />
                <input name="userrole" onChange={this.handleOnFieldChange} placeholder={'userrole'} />
                <button onClick={() => this.handleAddUserAssign()}>Assign User</button>
            </div>
        );
    }

    private handleOnFieldChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState(update(e.currentTarget.name, e.currentTarget.value));
    }

    private handleAddUserAssign = () => {
        this.props.handleAddProjAssignButton!(this.state.userid, this.state.userrole);
        this.setState(update('userid', ''));
        this.setState(update('userrole', ''));
    }
}

const update = (
    name: string,
    value: (string | number)
): ((state: State) => void) =>
    (prevState: State) => ({ [name]: value });