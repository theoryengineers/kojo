import * as React from 'react';
import { Cards } from 'app_modules/types';

interface BoardCardProps {
    card?: Cards;
    index?: number;
    colorCode?: string;
    handleEditCard?: (selection: string, card: Cards, index: number) => void;
}

const BoardCard: React.SFC<BoardCardProps> = (props) => {
    const { card, index, handleEditCard } = props;
    return (
        <div tabIndex={props.index} className="card">
            <div className="card__main" style={{ borderLeft: '10px solid ' + props.colorCode }}>
                <div className="card__main__header">
                    <div className="card__main__title">{card!.title}</div>
                    <div className="card__main__interface">
                        <button
                            draggable={true}
                            onDragStart={(e) => e.preventDefault()}
                            onClick={() => handleEditCard!('EDIT_CARD', card!, index!)}
                        >
                            Edit
                        </button>
                    </div>
                </div>
                <div className="card__main__category">{card!.category}</div>
                <div className="card__main__description">{card!.description}</div>
                <div className="card__main__assignment">{card!.assignment}</div>
            </div>
            <div
                className="card__comments"
                draggable={true}
                onDragStart={e => e.preventDefault()}
            >
                <div className="card__comments__row"><strong>theorye:</strong> THIS IS SHIT</div>
                <div className="card__comments__row"><strong>inzendn:</strong> LIKE UR FACE</div>
                <div
                    className="card__comments__input"
                >
                    <input type="text" />
                    <input type="button" value="+" />
                </div>
            </div>
        </div>
    );
};

export default BoardCard;