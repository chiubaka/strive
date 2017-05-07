import * as React from "react";
import { connect } from "react-redux";
import { ITask } from "../model/ITask";
import { Task } from "./Task";

export interface TaskListProps {
	tasks: ITask[];
}

export class TaskList extends React.Component<TaskListProps, {}> {
	public render(): JSX.Element {
		const tasks = this.props.tasks.map((task, i) => {

			const ConnectedTask = connect(Task.mapStateToProps(task.id), Task.mapDispatchToProps(task.id))(Task)
			return (
				<ConnectedTask key={i}/>
			);
		});

		return (
			<ul className="task-list">
				{tasks}
			</ul>
		);
	}
}
