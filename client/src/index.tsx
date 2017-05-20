import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";

import "../styles/index.scss";

import { SerenityApp } from "./components/SerenityApp";
import serenityApp from "./reducers";
import { DEFAULT_STATE } from "./model/SerenityState";
import { fetchTasks } from './actions/index';

const history = createHistory();
const store = createStore(serenityApp, applyMiddleware(
  routerMiddleware(history),
  thunk,
  logger
));

store.dispatch(fetchTasks());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <SerenityApp/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("serenity")
);