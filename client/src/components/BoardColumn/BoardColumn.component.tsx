import * as React from 'react';
import { DragDropCards } from 'app_modules/types';

interface BoardColumnProps extends DragDropCards {
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
            onDrop={(e) => onDrop(e.dataTransfer.getData('text'), e.currentTarget.id, props)}
        >
            {props.children}
        </div>
    </div >
);

const onDrop = (cardIndex: string, column: string, props: BoardColumnProps) => {
    props.handleDragDropCard(parseInt(cardIndex, 10), column);
};

export default BoardColumn;