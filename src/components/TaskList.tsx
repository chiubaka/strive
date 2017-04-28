import * as React from "react";
import { ITask } from "../model/ITask";
import { Task } from "./Task";

export interface TaskListProps {
	tasks: ITask[];
}

export class TaskList extends React.Component<TaskListProps, {}> {
	public render(): JSX.Element {
		const tasks = this.props.tasks.map((task, i) => {
			return (
				<Task
					key={i}
					task={task}
				/>
			);
		});

		return (
			<ul className="task-list">
				{tasks}
			</ul>
		);
	}
}
