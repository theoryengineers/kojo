import * as React from 'react';

const initialState = {

};

interface Props { }

type State = Readonly<typeof initialState>;

export default class MembersList extends React.Component<Props, State> {
    readonly state: State = initialState;
    render() {
        const { users } = this.props;
        return (
            <div className="memberslist">
                <div>
                    {
                        users.map((x, i) => {
                            return <div key={i}>
                                <div>{i + 1}</div>
                                <div>{x}</div>
                            </div>;
                        })
                    }
                </div>
            </div>
        );
    }
}