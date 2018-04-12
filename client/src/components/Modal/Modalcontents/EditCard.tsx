import * as React from 'react';
import { CardAddProps, Cards } from 'app_modules/types';

interface Props extends CardAddProps {
    handleModal: (selection: string) => void;
    cardIndex: number;
    card: Cards;
}

const initialState = {
    title: '',
    category: '',
    description: '',
    assignment: [0],
    cardIndex: 0
};

type State = Readonly<typeof initialState>;

class EditCard extends React.Component<Props, State> {

    static getDerivedStateFromProps(nextProp: Props, prevState: State) {
        return {
            title: nextProp.card.title,
            category: nextProp.card.category,
            description: nextProp.card.description,
            assignment: nextProp.card.assignment,
            cardIndex: nextProp.cardIndex
        };
    }

    readonly state: State = initialState;
    render() {
        return (
            <div className="modal">
                <input
                    className="input-field"
                    onChange={this.handleFieldInput}
                    type="text"
                    value={this.state.title}
                    name="title"
                />
                <input
                    className="input-field"
                    onChange={this.handleFieldInput}
                    type="text"
                    value={this.state.category}
                    name="category"
                />
                <textarea
                    className="input-field"
                    onChange={this.handleFieldInput}
                    rows={4}
                    value={this.state.description}
                    name="description"
                />
                <input
                    className="input-field"
                    onChange={this.handleFieldInput}
                    type="text"
                    value="Bob"
                    name="assignment"
                />
                <div>
                    <button
                        onClick={() => {
                            this.props.handleSaveCard({
                                id: 1,
                                title: this.state.title,
                                category: this.state.category,
                                description: this.state.description,
                                column: 'Backlog',
                                assignment: this.state.assignment,
                                board: 1
                            }, this.state.cardIndex);
                            this.props.handleModal('CLOSED');
                        }}
                    >
                        Save
                    </button>
                    <button onClick={() => this.props.handleModal('CLOSED')}>Cancel</button>
                </div>
            </div>
        );
    }
    private handleFieldInput = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.currentTarget;
        this.setState(updateField(name, value));
    }
}

const updateField = (name: string, value: string): (state: State) => void =>
    (prevState: State) => ({
        [name]: value
    });

export default EditCard;