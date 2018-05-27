import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.scss';
// Mobx
import { Provider } from 'mobx-react';
import { createStore } from './stores';

ReactDOM.render(
  <Provider {...(createStore())}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
