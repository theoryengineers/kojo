import * as React from 'react';
import ModalAddNewCard from './Modalcontents/AddNewCard';
import ModalEditCard from './Modalcontents/EditCard';
import { ModalProps, Cards } from 'app_modules/types';

interface Props extends ModalProps {
    currentModal: string;
    cardIndex: number;
    card: Cards;
    handleModal: (selection: string) => void;
}

const ModalConductor: React.SFC<Props> = (props) => {
    switch (props.currentModal) {
        case 'ADD_NEW_CARD':

            return <ModalAddNewCard {...props} handleAddCard={props.handleAddCard} />;
        case 'EDIT_CARD':
            return <ModalEditCard {...props} handleSaveCard={props.handleSaveCard} cardIndex={props.cardIndex} />;
        default:
            return null;
    }
};

export default ModalConductor;