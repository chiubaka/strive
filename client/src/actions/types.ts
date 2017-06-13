import { Action} from "redux";

import { ITask } from "../model/ITask";

export type SerenityAction = ReceiveTasks | RequestTasks | UpdateTask | StartEditingTaskName 
  | EditTaskName | FinishEditingTaskName | DisplayError;

export interface EditTaskName extends Action {
  id: number;
  name: string;
}

export interface StartEditingTaskName extends Action {
  id: number,
  name: string,
}

export interface FinishEditingTaskName extends Action {};

export interface UpdateTask extends Action {
  task: ITask;
}

export interface RequestTasks extends Action {}

export interface ReceiveTasks extends Action {
  tasks: ITask[];
}

export interface DisplayError extends Action {
  error: string;
}

const typeCache: { [label: string]: boolean } = {};

function type<T>(label: T | ""): T {
	if (typeCache[<string>label]) {
		throw new Error(`Action type "${label}" is not unique`);
	}

	typeCache[<string>label] = true;

	return <T>label;
}

export const ActionTypes = {
  REQUEST_TASKS: type<"REQUEST_TASKS">("REQUEST_TASKS"),
  RECEIVE_TASKS: type<"RECEIVE_TASKS">("RECEIVE_TASKS"),
  UPDATE_TASK: type<"UPDATE_TASK">("UPDATE_TASK"),
  START_EDITING_TASK_NAME: type<"START_EDITING_TASK_NAME">("START_EDITING_TASK_NAME"),
  EDIT_TASK_NAME: type<"EDIT_TASK_NAME">("EDIT_TASK_NAME"),
  FINISH_EDITING_TASK_NAME: type<"FINISH_EDITING_TASK_NAME">("FINISH_EDITING_TASK_NAME"),
  DISPLAY_ERROR: type<"DISPLAY_ERROR">("DISPLAY_ERROR"),
  START_LOGIN: type<"START_LOGIN">("START_LOGIN"),
  COMPLETE_LOGIN: type<"COMPLETE_LOGIN">("COMPLETE_LOGIN"),
};