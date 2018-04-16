import * as React from 'react';
import ModalConductor from './modal.conductor';
import { PageProps, ModalProps, Cards } from 'app_modules/types';

interface Props extends PageProps, ModalProps {
    card: Cards;
    currentModal: string;
    cardIndex: number;
    handleModal: (selection: string) => void;
}

// Modal Wrapper
const Modal: React.SFC<Props> = (props) => (
    <div
        className={'modal ' + (props.currentModal !== 'CLOSED' ? 'modal-show' : 'modal-hide')}
        onClick={() => props.handleModal('CLOSED')}
    >
        <div onClick={(e) => e.stopPropagation()} >
            <ModalConductor {...props} />
        </div>
    </div>
);

export default Modal;