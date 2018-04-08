import * as React from 'react';

interface Props {
    // name: string;
    // handleChange(event: React.ChangeEvent<HTMLElement>): void;
}

export default class HelloForm extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <div>
                <input 
                    value={this.props.name}
                    onChange={e => this.props.handleChange(e)}
                />
            </div>
        );
    }
}