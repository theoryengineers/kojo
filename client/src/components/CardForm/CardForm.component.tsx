import * as React from 'react';

interface Props {
    handleOpenModal: (openClose: boolean) => void;
}

interface State {

}

export default class CardForm extends React.Component<Props, State> {
    render() {
        return (
            <div className="cardform">
                <input
                    className="input-field"
                    onChange={() => null}
                    type="text"
                    value="Title"
                    name="title"
                />
                <input
                    className="input-field"
                    onChange={() => null}
                    type="text"
                    value="Category"
                    name="category"
                />
                <textarea
                    className="input-field"
                    onChange={() => null}
                    rows={4}
                    defaultValue="Description"
                    name="description"
                />
                <input
                    className="input-field"
                    onChange={() => null}
                    type="text"
                    value="Assignment"
                    name="assignment"
                />
                <div>
                    <button>Save</button>
                    <button onClick={this.handleOpenModal}>Cancel</button>
                </div>
            </div>
        );
    }

    private handleOpenModal = (event: React.MouseEvent<HTMLElement>): void => {
        this.props.handleOpenModal(false);
    }
}