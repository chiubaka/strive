import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "../styles/index.scss";

import { SerenityApp } from "./components/SerenityApp";
import { createStore } from "redux";
import serenityApp from "./reducers";
import { DEFAULT_STATE } from "./model/SerenityState";

const store = createStore(serenityApp, DEFAULT_STATE);

render(
	<Provider store={store}>
	  <SerenityApp/>
	</Provider>,
	document.getElementsByTagName("body")[0]
);