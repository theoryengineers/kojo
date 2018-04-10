import * as React from 'react';

interface Props {
    children: React.ReactNode;
    show: boolean;
}

const Modal: React.SFC<Props> = (props) => (
    <div className={'modal ' + (props.show ? 'modal-show' : '')}>
        {props.children}
    </div>
);

export default Modal;