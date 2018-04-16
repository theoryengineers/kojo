import * as React from 'react';

interface Props {
    displayName: string;
}

const TopBarNavigation: React.SFC<Props> = (props) => (
    <div className="topbarnav">
        <div>&nbsp;</div>
        <div>Howdy, {props.displayName}!</div>
        <div onClick={() => null}>Sign Out</div>
    </div>
);

export default TopBarNavigation;