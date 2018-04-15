import * as React from 'react';
import { DragDropCards } from 'app_modules/types';

interface Props extends DragDropCards {

}

const DragAndDrop: React.SFC<Props> = (props) => (
    <div
        draggable={true}
        onDragStart={(e) => {
            let x = e.currentTarget.children[0];
            e.dataTransfer.setData('text', (x as HTMLElement).tabIndex.toString());
        }}
        onDragEnter={(e) => {
            e.preventDefault();
        }}
        onDragOver={e => {
            e.preventDefault();
        }}
        onDrop={e => {
            e.stopPropagation();
            // Grab the drop index
            let dropCardIndex: number = (e.currentTarget.children[0] as HTMLElement).tabIndex;

            // Grab the old Card index
            let oldCardIndex: number = parseInt(e.dataTransfer.getData('text'), 10);

            // Grab the Column id - i.e., "In Progress", "Testing"
            let column: string = '';
            if (e.currentTarget.parentElement !== null) {
                column = e.currentTarget.parentElement.id;
            }

            // Grab Bounding values of the Card being hovered over.
            let x = e.currentTarget.getBoundingClientRect();
            let dropBoundAction = '';
            // MouseY - Position of Mouse relative to hovered Card
            let mouseY = e.clientY - x.top;
            // MiddleBoundValue - hovered Card's Middle Boundary
            let MidBoundValue = (x.bottom - x.top) / 2;
            // Make it drop up when MouseY is less than MiddleBoundValue
            if (mouseY < MidBoundValue) {
                dropBoundAction = 'DROP_UP';
            } else if (mouseY > MidBoundValue) {
                dropBoundAction = 'DROP_DOWN';
            }

            props.handleDragDropCard(oldCardIndex, dropCardIndex, column, dropBoundAction);
        }}
    >
        {props.children}
    </div>
);

export default DragAndDrop;