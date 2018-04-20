import * as React from 'react';
import { Memberslist } from 'app_modules/types';

const initialState = {

};

interface Props {
    memberslist: Array<Memberslist>;
}

type State = Readonly<typeof initialState>;

export default class MembersList extends React.Component<Props, State> {
    readonly state: State = initialState;
    render() {
        const { memberslist } = this.props;
        return (
            <div className="memberslist">
                <div className="memberslist__row">
                    <div className="memberslist__row__header">#</div>
                    <div className="memberslist__row__header">User</div>
                    <div className="memberslist__row__header">Email</div>
                    {
                        memberslist.map((x, i) => {
                            return <>
                                <div key={i}>{i + 1}</div>
                                <div key={i}>{x.displayName}</div>
                                <div key={i}>{x.email}</div>
                            </>;
                        })
                    }
                </div>
            </div>
        );
    }
}