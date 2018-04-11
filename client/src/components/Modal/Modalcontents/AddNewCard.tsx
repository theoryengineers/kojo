import * as React from 'react';

interface Props {
    handleModal: (selection: string) => void;
}

const initialState = {
    title: '',
    category: '',
    description: '',
    assignment: ''
};

type State = Readonly<typeof initialState>;

class AddNewCard extends React.Component<Props, State> {
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
                    value={this.state.assignment}
                    name="assignment"
                />
                <div>
                    <button>Add</button>
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
    (prevState: State) => ({ [name]: value });

export default AddNewCard;