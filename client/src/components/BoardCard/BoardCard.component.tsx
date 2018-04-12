import * as React from 'react';
import { Cards } from 'app_modules/types';

interface BoardCardProps {
    key: number;
    card: Cards;
    index: number;
    colorCode: string;
    handleEditCard: (selection: string, card: Cards, index: number) => void;
}

const BoardCard: React.SFC<BoardCardProps> = (props) => (
    <div className="card" style={{ borderLeft: '15px solid ' + props.colorCode }}>
        <div className="card-header">
            <div className="title">{props.card.title}</div>
            <div className="card-interface">
                <button
                    onClick={() => props.handleEditCard('EDIT_CARD', props.card, props.index)}
                >
                    Edit
                </button>
            </div>
        </div>
        <div className="category">{props.card.category}</div>
        <div className="description">{props.card.description}</div>
        <div className="assignment">{props.card.assignment}</div>
    </div>
);

export default BoardCard;