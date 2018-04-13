import * as React from 'react';

interface Props { }

const DragAndDrop: React.SFC<Props> = (props) => (
    <div
        draggable={true}
        onDragStart={(e) => {
            e.dataTransfer.setData('text', e.currentTarget.children[0].attributes[0].value.toString());
        }}
    >
        {props.children}
    </div>
);

export default DragAndDrop;