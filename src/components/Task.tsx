import * as React from "react";
import { ITask } from "../model/ITask";
import { Checkbox, EditableText } from "@blueprintjs/core";
import { SerenityState } from '../model/SerenityState';
import { Action } from 'redux';
import { ActionTypes, completeTask } from '../actions/index';

export interface TaskProps {
	task: ITask;
	onComplete: () => void;
}

export class Task extends React.Component<TaskProps, {}> {
	public static mapStateToProps(id: number): (state: SerenityState) => Partial<TaskProps> {
		return (state: SerenityState) => {
			return {
				task: state.tasksById[id]
			};
		};
	} 

	public static mapDispatchToProps(id: number): (dispatch: (action: Action) => void) => Partial<TaskProps> {
		return (dispatch: (action: Action) => void) => {
			return {
				onComplete: () => {
					dispatch(completeTask(id));
				}
			};
		};
	}
	
	public render(): JSX.Element {
		const task = this.props.task;

		return (
			<li className="task">
				<Checkbox
					checked={task.completed}
					onChange={this.props.onComplete.bind(this)}
				/>
				<span className={"pt-icon-standard pt-icon-star" + (task.important ? "" : "-empty") }/>
				<EditableText
					value={task.name}
				/>
			</li>
		)
	}
}