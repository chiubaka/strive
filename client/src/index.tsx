import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom"
import { ConnectedRouter, routerMiddleware } from "react-router-redux";

import "../styles/index.scss";

import LoginPage from "./auth/pages/LoginPage";
import LogoutPage from "./auth/pages/LogoutPage";
import SerenityApp from "./components/SerenityApp";
import { fetchTasks } from './actions/index';
import AuthenticatedContainer from './auth/components/AuthenticatedContainer';
import { store, history } from './store';

// TODO: The need to import images in this manner can be eliminated by properly loading
// babel-plugin-transform-react-jsx-img-import. awesome-typescript-loader is supposed to
// have built-in support for babel transpiling, but I've had trouble getting it to work
// properly with this plugin.
const striveLogo = require("../resources/img/strive_logo.png");

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