import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
// tslint:disable-next-line:ordered-imports
import { Provider } from "react-redux";
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// tslint:disable-next-line:ordered-imports
import { createStore } from "redux";
// tslint:disable-next-line:ordered-imports
import reducers from "./reducers/index";

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
