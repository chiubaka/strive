import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import { createStore, applyMiddleware } from "redux";
import createHistory from "history/createBrowserHistory";

import "../styles/index.scss";

import { SerenityApp } from "./components/SerenityApp";
import serenityApp from "./reducers";
import { DEFAULT_STATE } from "./model/SerenityState";

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(serenityApp, DEFAULT_STATE, applyMiddleware(middleware));

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <SerenityApp/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("serenity")
);