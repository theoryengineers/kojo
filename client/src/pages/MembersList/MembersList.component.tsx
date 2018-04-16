import * as React from 'react';

const initialState = {

};

interface Props { }

type State = Readonly<typeof initialState>;

export default class MembersList extends React.Component<Props, State> {
    readonly state: State = initialState;
    render() {
        return (
            <div>Bob</div>
        );
    }
}