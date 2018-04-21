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
                <table className="memberslist__table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            memberslist.map((x, i) => {
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{x.displayName}</td>
                                    <td>{x.email}</td>
                                </tr>;
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}