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
    <div tabIndex={props.index} className="card" style={{ borderLeft: '10px solid ' + props.colorCode }}>
        <div className="card__header">
            <div className="card__title">{props.card.title}</div>
            <div className="card__interface">
                <button
                    onClick={() => props.handleEditCard('EDIT_CARD', props.card, props.index)}
                >
                    Edit
                </button>
            </div>
        </div>
        <div className="card__category">{props.card.category}</div>
        <div className="card__description">{props.card.description}</div>
        <div className="card__assignment">{props.card.assignment}</div>
    </div>
);

export default BoardCard;