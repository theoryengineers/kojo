import * as React from 'react';
import Routes from './router';

interface Props {}

interface State {}

export class App extends React.Component<Props, State> {
    render() {
        return (
           <Routes/>
        );
    }
}

export default App;