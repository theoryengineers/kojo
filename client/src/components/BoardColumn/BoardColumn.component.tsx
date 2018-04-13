import * as React from 'react';

interface BoardColumnProps {
    header: string;
    backgroundColor: string;
    leftButton?: JSX.Element;
    rightButton?: JSX.Element;
}

const BoardColumn: React.SFC<BoardColumnProps> = (props) => (
    <div className="column">
        <div className="column__header" style={{ backgroundColor: props.backgroundColor }}>
            <div className="column__header__alignment">{props.leftButton}</div>
            <div className="column__header__alignment">{props.header}</div>
            <div className="column__header__alignment">{props.rightButton}</div>
        </div>
        <div
            // Turn this into a DropZone Component later
            id={props.header}
            className="column__content"
            style={{ backgroundColor: 'blue' }}
            onDragEnter={() => null}
            onDragOver={e => e.preventDefault()}
            onDrop={(e) => console.log(e.dataTransfer.getData('text'), e.currentTarget.id)}
        >
            {props.children}
        </div>
    </div >
);

export default BoardColumn;