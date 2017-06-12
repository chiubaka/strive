import * as React from "react";
import { connect } from "react-redux";
import { Link, Switch, Route } from "react-router-dom"
import { Navbar } from "./Navbar";
import { DUMMY_TASKS } from "../model/ITask";
import { PriorityMatrixPage } from "./pages/PriorityMatrixPage";

export class SerenityApp extends React.Component<{}, {}> {
  public render(): JSX.Element {

		return (
			<div className="serenity">
        <Navbar/>
				<div className="content">
					<Switch>
						<Route exact path="/app">
              <div>
                Home!
              </div>
            </Route>
						<Route path="/app/priority-matrix" component={PriorityMatrixPage}/>
					</Switch>
				</div>
			</div>
		);
	}
}