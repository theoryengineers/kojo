import { RouteProps } from 'react-router-dom';

export interface PageProps extends RouteProps { }

export interface Cards {
    id: number;
    title: string;
    category: string;
    description: string;
    column: string;
    assignment: Array<number>;
    board: number;
}

export interface ModalProps {
    handleAddCard: (newCardObj: Cards) => void;
    handleSaveCard: (newCardObj: Cards, cardIndex: number) => void;
}

export interface GetCards {
    handleGetCards: () => void;
}

export interface DragDropCards {
    handleDragDropCard: (oldCardIndex: number, dropCardIndex: number, cardColumn: string, action: string) => void;
}