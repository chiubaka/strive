import * as React from "react";
import { connect } from "react-redux";
import { Navbar } from "./Navbar";
import { DUMMY_TASKS } from "../model/ITask";
import { ConnectedPriorityMatrix } from './PriorityMatrix';

export class SerenityApp extends React.Component<{}, {}> {
	public render(): JSX.Element {

		return (
			<div className="serenity">
				<Navbar/>
				<div className="content">
					<ConnectedPriorityMatrix/>
				</div>
			</div>
		);
	}
}