import * as React from "react";
import { ITask } from "../model/ITask";
import { Checkbox, EditableText } from "@blueprintjs/core";

export interface TaskProps {
	task: ITask;
}

export class Task extends React.Component<TaskProps, {}> {
	public render(): JSX.Element {
		return (
			<li className="task">
				<Checkbox
					checked={this.props.task.completed}
				/>
				<span className={"pt-icon-standard pt-icon-star" + (this.props.task.important ? "" : "-empty") }/>
				<EditableText
					value={this.props.task.name}
				/>
			</li>
		)
	}
}