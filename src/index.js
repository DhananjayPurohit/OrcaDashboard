import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'react-dropdown/style.css';
import './style.css';
import "bootstrap/dist/css/bootstrap.css";

var hist = createBrowserHistory();

ReactDOM.render(<Router history={hist}>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </Router>, document.getElementById('root'));

serviceWorker.unregister();
