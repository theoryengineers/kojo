import * as React from 'react';

interface BoardCardProps {
    colorCode: string;
    title: string;
    description: string;
    category: string;
    assignment: string;
}

const BoardCard: React.SFC<BoardCardProps> = (props) => (
    <div className="card" style={{borderLeft: '15px solid ' + props.colorCode}}>
        <div className="card-header">
            <div className="title">{props.title}</div>
            <div className="card-interface">==></div>
        </div>
        <div className="category">{props.category}</div>
        <div className="description">{props.description}</div>
        <div className="assignment">{props.assignment}</div>
    </div>
);

export default BoardCard;