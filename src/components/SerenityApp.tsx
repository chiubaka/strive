import * as React from "react";
import { Navbar } from "./Navbar";
import { DUMMY_TASKS } from "../model/ITask";
import { PriorityMatrix } from "./PriorityMatrix";

export class SerenityApp extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<div className="serenity">
				<Navbar/>
				<div className="content">
					<PriorityMatrix
						tasks={DUMMY_TASKS}
					/>
				</div>
			</div>
		);
	}
}