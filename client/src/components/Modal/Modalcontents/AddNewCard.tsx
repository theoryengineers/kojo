import * as React from 'react';
import { Cards } from 'app_modules/types';
import { updateAction } from 'app_modules/App';

interface Props {
    handleModal: (selection: string) => void;
    handleAddCard: (newCardObj: Cards) => void;
}

const initialState = {
    title: '',
    category: '',
    description: '',
    assignment: [0]
};

type State = Readonly<typeof initialState>;

class AddNewCard extends React.Component<Props, State> {
    readonly state: State = initialState;
    render() {
        return (
            <div className="modal__form">
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
                            this.props.handleAddCard({
                                id: 1,
                                title: this.state.title,
                                category: this.state.category,
                                description: this.state.description,
                                column: 'Backlog',
                                assignment: this.state.assignment,
                                board: 1
                            });
                            this.props.handleModal('CLOSED');
                        }}
                    >
                        Add
                    </button>
                    <button onClick={() => this.props.handleModal('CLOSED')}>Cancel</button>
                </div>
            </div>
        );
    }

    private handleFieldInput = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.currentTarget;
        this.setState(updateAction(name, value));
    }
}

export default AddNewCard;