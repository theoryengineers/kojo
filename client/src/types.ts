import { RouteProps } from 'react-router-dom';

export interface PageProps extends RouteProps {

}

export interface CardProps {
    handleGetCards: () => void;
}