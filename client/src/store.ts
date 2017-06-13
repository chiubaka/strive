import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";

import serenityApp from "./reducers";
import { getExistingState } from './model/SerenityState';

export const history = createHistory();

export const store = createStore(serenityApp, getExistingState(), applyMiddleware(
  routerMiddleware(history),
  thunk,
  logger
));