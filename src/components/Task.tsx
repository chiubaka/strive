import * as React from "react";
import { ITask } from "../model/ITask";
import { Checkbox } from "@blueprintjs/core";

export interface TaskProps {
	task: ITask;
}

export class Task extends React.Component<TaskProps, {}> {
	public render(): JSX.Element {
		return (
			<li className="task">
				<Checkbox checked={this.props.task.completed} label={this.props.task.name}/>
			</li>
		)
	}
}