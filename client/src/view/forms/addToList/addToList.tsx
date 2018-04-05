import * as React from 'react';

const TodoForm = () => {
    // let input;

    return (
        <div>
            <input 
                ref={node => {
                    // input = node;
                }}
            />
            {/* <button onClick={() => {
                    addToList(input.value);
                    input.value = '';
                }}
            > */}
                +
            {/* </button> */}
        </div>
    );
};

export default TodoForm;