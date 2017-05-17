import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "../styles/index.scss";

import { SerenityApp } from "./components/SerenityApp";
import { createStore } from "redux";
import serenityApp from "./reducers";
import { DEFAULT_STATE } from "./model/SerenityState";

const store = createStore(serenityApp, DEFAULT_STATE);

render(
  <Provider store={store}>
    <BrowserRouter>
      <SerenityApp/>
    </BrowserRouter>
  </Provider>,
  document.getElementById("serenity")
);