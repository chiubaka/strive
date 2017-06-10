import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom"
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";

import "../styles/index.scss";

import LoginPage from "./auth/pages/LoginPage";
import LogoutPage from "./auth/pages/LogoutPage";
import { SerenityApp } from "./components/SerenityApp";
import serenityApp from "./reducers";
import { getExistingState } from './model/SerenityState';
import { fetchTasks } from './actions/index';
import AuthenticatedContainer from './auth/components/AuthenticatedContainer';

const history = createHistory();
const store = createStore(serenityApp, getExistingState(), applyMiddleware(
  routerMiddleware(history),
  thunk,
  logger
));

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/">
          <div>
            Home
          </div>
        </Route>
        <Route path="/login">
          <LoginPage 
            defaultRedirectPath="/app"
            facebookAppId="1065804050218670"
          />
        </Route>
        <Route path="/logout">
          <LogoutPage/>
        </Route>
        <Route path="/app">
          <AuthenticatedContainer>
            <SerenityApp/>
          </AuthenticatedContainer>
        </Route>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("serenity")
);