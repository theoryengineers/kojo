import { RouteProps } from 'react-router-dom';

export interface PageProps extends RouteProps { }

export interface Database {
    boards: {
        id: number;
        title: string;
        members: number[];
        cards: number[];
        columns: string[];
    }[];
    cards: {
        id: number;
        title: string;
        category: string;
        description: string;
        column: string;
        assignment: number[];
        board: number;
    }[];
    users: {
        id: number;
        displayName: string;
        password: string;
        email: string;
    }[];
}

export interface ResObjLogin {
    created_on: Date;
    email: string;
    name: string;
    user_id: number;
    username: string;
}

export interface ResObjProjectsById {
    user_id: number;
    project_name: string;
    created_on: Date;
    email: string;
    name: string;
    username: string;
}

export interface Boards {
    id: number;
    title: string;
    members: number[];
    cards: number[];
    columns: string[];
}

export interface Memberslist {
    id: number;
    displayName: string;
    password: string;
    email: string;
}

export interface Cards {
    id: number;
    title: string;
    category: string;
    description: string;
    column: string;
    assignment: Array<number>;
    boardid: number;
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

export interface DisplayName {
    displayName: string;
}