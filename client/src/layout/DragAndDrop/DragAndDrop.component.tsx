import * as React from 'react';
import { DragDropCards } from 'app_modules/types';

interface Props extends DragDropCards { }

const initialState = {
    dropAction: '',
    isDragging: false
};

type State = Readonly<typeof initialState>;

class DragAndDrop extends React.Component<Props, State> {
    readonly state: State = initialState;
    render() {
        const { children, handleDragDropCard } = this.props;
        return (
            <div
                className="drag-and-drop"
                style={{
                    cursor: 'pointer',
                    // CONVERT THESE TO CLASSES LATER
                    borderTop: (
                        this.state.dropAction === 'DROP_UP' ? '50px solid orange' : null),
                    borderBottom: (
                        this.state.dropAction === 'DROP_DOWN' ? '50px solid orange' : null),
                }}
                draggable={true}
                onDragStart={(e) => {
                    let x = e.currentTarget.children[0];
                    e.dataTransfer.setData('text', (x as HTMLElement).tabIndex.toString());
                }}
                onDrag={e => {
                    this.setState({ isDragging: true });
                }}
                onDragEnd={e => {
                    this.setState({ isDragging: false });
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // THIS BLOCK CREATES STATES FOR DETERMINING DROP ZONE INDICATORS

                    // Grab Bounding values of the Card being hovered over.
                    let x = e.currentTarget.getBoundingClientRect();
                    // MouseY - Position of Mouse relative to hovered Card
                    let mouseY = e.clientY - x.top;
                    // MiddleBoundValue - hovered Card's Middle Boundary
                    let midBoundValue = (x.bottom - x.top) / 2;
                    // Make it drop up when MouseY is less than MiddleBoundValue
                    if (mouseY < midBoundValue) {
                        this.setState({
                            dropAction: 'DROP_UP'
                        });
                    } else if (mouseY > midBoundValue) {
                        this.setState({
                            dropAction: 'DROP_DOWN'
                        });
                    }
                }}
                onDragLeave={e => {
                    e.preventDefault();
                    let rect = e.currentTarget.getBoundingClientRect();
                    if (e.clientY <= rect.top
                        || e.clientY >= rect.bottom || e.clientX <= rect.left || e.clientX >= rect.right) {
                        this.setState({
                            dropAction: ''
                        });
                    }
                }}
                onDrop={
                    (e) => {
                        if (!isNaN(parseInt(e.dataTransfer.getData('text'), 10))) {
                            e.stopPropagation();

                            // Grab the drop index
                            let dropCardIndex: number = (e.currentTarget.children[0] as HTMLElement).tabIndex;
                            console.log(e.currentTarget.children.namedItem.name);

                            // Grab the old Card index
                            let oldCardIndex: number = parseInt(e.dataTransfer.getData('text'), 10);

                            // Grab the Column id - i.e., "In Progress", "Testing"
                            let column: string = '';
                            if (e.currentTarget.parentElement !== null) {
                                column = e.currentTarget.parentElement.id;
                            }

                            // Grab Bounding values of the Card being hovered over.
                            let x = e.currentTarget.getBoundingClientRect();
                            let dropAction: string = '';
                            // MouseY - Position of Mouse relative to hovered Card
                            let mouseY = e.clientY - x.top;
                            // MiddleBoundValue - hovered Card's Middle Boundary
                            let midBoundValue = (x.bottom - x.top) / 2;
                            // Make it drop up when MouseY is less than MiddleBoundValue
                            if (mouseY < midBoundValue) {
                                dropAction = 'DROP_UP';
                            } else if (mouseY > midBoundValue) {
                                dropAction = 'DROP_DOWN';
                            }

                            handleDragDropCard(oldCardIndex, dropCardIndex, column, dropAction);
                            this.setState({ dropAction: '' });
                        }
                    }
                }
            >
                {
                    this.state.isDragging === false
                        ? children
                        : null
                }
            </div >
        );
    }
}

export default DragAndDrop;