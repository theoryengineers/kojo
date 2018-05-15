import { RouteProps } from 'react-router-dom';

export interface PageProps extends RouteProps { }

export interface DragDropCards {
    handleDragDropCard: (oldCardIndex: number, dropCardIndex: number, cardColumn: string, action: string) => void;
}

export interface UserRes {
    fname: string;
    lname: string;
    displayname: string;
    email: string;
    joined: string;
    user_id: number;
}
export interface ProjectRes {
    project_name: string;
    project_id: number;
    created_on: string;
    assignment: Array<{
        user: UserRes,
        user_role: number;
    }>;
    sprint?: [string];
    story?: [string];
}