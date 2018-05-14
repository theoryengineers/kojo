import * as React from 'react';
import ModalAddNewCard from './Modalcontents/AddNewCard';
import ModalEditCard from './Modalcontents/EditCard';
import { Cards } from 'app_modules/types';

interface Props {
    currentModal: string;
    cardIndex: number;
    card: Cards;
    handleModal: (selection: string) => void;
}

const ModalConductor: React.SFC<Props> = (props) => {
    switch (props.currentModal) {
        case 'ADD_NEW_CARD':

            return <ModalAddNewCard {...props} />;
        case 'EDIT_CARD':
            return <ModalEditCard {...props} cardIndex={props.cardIndex} />;
        default:
            return null;
    }
};

export default ModalConductor;