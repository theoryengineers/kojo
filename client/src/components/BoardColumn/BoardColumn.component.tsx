import * as React from 'react';

interface BoardColumnProps {
    header: string;
    backgroundColor: string;
    leftButton?: JSX.Element;
    rightButton?: JSX.Element;
}

const BoardColumn: React.SFC<BoardColumnProps> = (props) => (
    <div className="column">
        <div className="header" style={{ backgroundColor: props.backgroundColor }}>
            <div className="alignment">{props.leftButton}</div>
            <div className="alignment">{props.header}</div>
            <div className="alignment">{props.rightButton}</div>
        </div>
        {props.children}
    </div>
);

export default BoardColumn;