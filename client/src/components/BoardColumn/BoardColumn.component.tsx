import * as React from 'react';

interface BoardColumnProps {
    header?: string;
    backgroundColor?: string;
    display?: boolean;
    leftButton?: JSX.Element;
    rightButton?: JSX.Element;
}

const BoardColumn: React.SFC<BoardColumnProps> = (props) => (
    <div className={'column ' + (!props.display ? 'column-hide' : '')}>
        <div className="column__header" style={{ backgroundColor: props.backgroundColor }}>
            <div className="column__header__alignment">{props.leftButton}</div>
            <div className="column__header__alignment">{props.header}</div>
            <div className="column__header__alignment">{props.rightButton}</div>
        </div>
        <div
            // Turn this into a DropZone Component later
            // Turn the color changes into classes later
            id={props.header}
            className="column__content"
            onDragEnter={e => {
                e.preventDefault();
                e.currentTarget.style.backgroundColor = 'orange';
            }}
            onDragLeave={e => {
                e.currentTarget.style.backgroundColor = 'lightgray';
            }}
            onDragOver={e => { e.preventDefault(); e.currentTarget.style.backgroundColor = 'orange'; }}
            onDrop={(e) => {
                onDrop(e, props);
                e.currentTarget.style.backgroundColor = 'lightgray';
            }}
        >
            <div className="column__content__container">{props.children}</div>
        </div>
    </div >
);

const onDrop = (e: React.DragEvent<HTMLElement>, props: BoardColumnProps): void => {
    if (!isNaN(parseInt(e.dataTransfer.getData('text'), 10))) {
        // let oldCardIndex = parseInt(e.dataTransfer.getData('text'), 10);
        // let column = e.currentTarget.id;
        // let action = 'DROP_COLUMN';
        // let newCardIndex = 0;

        // if (e.currentTarget.children !== null) {
        //     newCardIndex = e.currentTarget.children[0].children.length + 1;
        // }

        // props.handleDragDropCard(oldCardIndex, newCardIndex, column, action);
    }
};

export default BoardColumn;