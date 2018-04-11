import * as React from 'react';
import ModalConductor from './modal.conductor';
import { PageProps } from 'app_modules/types';

interface Props extends PageProps {
    currentModal: string;
    handleModal: (selection: string) => void;
}

// Modal Wrapper
const Modal: React.SFC<Props> = (props) => (
    <div className={'modal-container ' + (props.currentModal !== 'CLOSED' ? 'modal-show' : null)} >
        <ModalConductor {...props} />
    </div>
);

export default Modal;