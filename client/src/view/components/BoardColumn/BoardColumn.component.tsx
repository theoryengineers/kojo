import * as React from 'react';

interface BoardColumnProps {
    header: string;
    backgroundColor: string;
}

const BoardColumn: React.SFC<BoardColumnProps> = (props) => (
    <div className="column">
        <div className="header" style={{backgroundColor: props.backgroundColor}}>
            {props.header}
        </div>
        {props.children}
    </div>
);

export default BoardColumn;