import * as React from 'react';

interface Props {
    displayName: string;
    handleLogOut: () => void;
}

const TopBarNavigation: React.SFC<Props> = (props) => (
    <div className="topbarnav">
        <div>&nbsp;</div>
        <div>Howdy, {props.displayName}!</div>
        <div><a href="/" onClick={() => props.handleLogOut()}><button>Sign Out</button></a></div>
    </div>
);

export default TopBarNavigation;