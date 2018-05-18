import * as React from 'react';
import ModalConductor from './Modal.conductor';
import { PageProps, ModalProps, Cards } from 'app_modules/types';

interface Props extends PageProps, ModalProps {
    card?: Cards;
    currentModal?: string;
    cardIndex?: number;
    handleModal?: (selection: string) => void;
}

// Modal Wrapper
const Modal: React.SFC<Props> = (props) => (
    <div
        className={'modal ' + openCloseModal(props)}
        onClick={() => props.handleModal!('CLOSED')}
    >
        <div onClick={(e) => e.stopPropagation()} >
            <ModalConductor {...props} />
        </div>
    </div>
);

const openCloseModal = (props: Props): string => {
    if (props.currentModal === 'CLOSED') {
        return 'modal-hide';
    } else if (props.currentModal === '') {
        return '';
    } else {
        return 'modal-show';
    }
};

export default Modal;