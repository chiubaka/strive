import * as React from "react";
import { Navbar } from "./Navbar";
import { TaskList } from "./TaskList";
import { DUMMY_TASKS } from "../model/ITask";

export class SerenityApp extends React.Component<{}, {}> {
	public render(): JSX.Element {
		// TODO: Move inline styling to SCSS
		return (
			<div className="serenity">
				<Navbar/>
				<div className="content" style={{"margin-top": "50px"}}>
					<TaskList
						tasks={DUMMY_TASKS}
					/>
				</div>
			</div>
		);
	}
}