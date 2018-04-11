import * as React from 'react';
import ModalAddNewCard from './modalcontents/addnewcard';
// import ModalEditCard from './modalcontents/editcard';

interface Props {
    currentModal: string;
    handleModal: (selection: string) => void;
}

const ModalConductor: React.SFC<Props> = (props) => {
    switch (props.currentModal) {
        case 'ADD_NEW_CARD':
            return <ModalAddNewCard {...props} />;
        // case 'EDIT_CARD':
        //     return <ModalEditCard {...props} />;
        default:
            return null;
    }
};

export default ModalConductor;