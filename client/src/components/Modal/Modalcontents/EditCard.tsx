import * as React from 'react';
import { Cards } from 'app_modules/types';

interface Props {
    cardIndex?: number;
    card?: Cards;
    handleModal?: (selection: string) => void;
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
            title: nextProp.card!.title,
            category: nextProp.card!.category,
            description: nextProp.card!.description,
            assignment: nextProp.card!.assignment,
            cardIndex: nextProp.cardIndex
        };
    }

    readonly state: State = initialState;

    render() {
        return (
            <div className="modal__form">
                <div className="modal__title">EDIT TASK</div>
                <label>Title</label>
                <input
                    className="input-field"
                    onChange={this.handleFieldInput}
                    type="text"
                    value={this.state.title}
                    name="title"
                />
                <label>Category</label>
                <input
                    className="input-field"
                    onChange={this.handleFieldInput}
                    type="text"
                    value={this.state.category}
                    name="category"
                />
                <label>Description</label>
                <textarea
                    className="input-field"
                    onChange={this.handleFieldInput}
                    rows={4}
                    value={this.state.description}
                    name="description"
                />
                <label>Assignment</label>
                <input
                    className="input-field"
                    onChange={this.handleFieldInput}
                    type="text"
                    value="Bob"
                    name="assignment"
                />
                <div className="modal__buttons">
                    <button
                        onClick={() => {
                            // this.props.handleSaveCard(
                            //     {
                            //         id: 1,
                            //         title: this.state.title,
                            //         category: this.state.category,
                            //         description: this.state.description,
                            //         column: 'Backlog',
                            //         assignment: this.state.assignment,
                            //         boardid: 1

                            //     },
                            //     this.state.cardIndex
                            // );
                            this.props.handleModal!('CLOSED');
                        }}
                    >
                        Save
                    </button>
                    <button onClick={() => this.props.handleModal!('CLOSED')}>Cancel</button>
                </div>
            </div>
        );
    }
    private handleFieldInput = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        // const { name, value } = event.currentTarget;
        // this.setState(updateAction(name, value));
    }
}

export default EditCard;