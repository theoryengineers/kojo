import * as React from 'react';
import Login from 'app_modules/pages/Login';

// Switch between Register and Login form
// Can be used to contain other Splash related components

interface Props {
    onLoggedInProp: (isLoggedIn: boolean) => void;
}

interface State {}

export class Splash extends React.Component<Props, State> {
    state = {
        route: ''
    };

    render () {
        const { onLoggedInProp } = this.props;
        return (
            <div className="splash-container">
                <Login onLoggedInProp={onLoggedInProp} />
            </div>
        );
    }
}

export default Splash;
