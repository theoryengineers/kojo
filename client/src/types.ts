import { RouteProps } from 'react-router-dom';

export interface PageProps extends RouteProps {

}

export interface Cards {
    id: number;
    title: string;
    category: string;
    description: string;
    column: string;
    assignment: Array<number>;
    board: number;
}

export interface CardProps {
    handleGetCards: () => void;
    cards: Array<Cards>;
}

export interface CardAddProps {
    handleAddCard: (newCardObj: Cards) => void;
    handleSaveCard: (newCardObj: Cards, cardIndex: number) => void;
}