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

// TODO: Is there somewhere more global I can put this?
// This is a TS shim so that I can require files, etc. which Webpack will then load.
// https://stackoverflow.com/a/12742371/599391
declare function require(name: string): string;

// TODO: The need to import images in this manner can be eliminated by properly loading
// babel-plugin-transform-react-jsx-img-import and using a babel-loader in my webpack config.
const striveLogo = require("../resources/img/strive_logo.png");

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
            logoPath={striveLogo}
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