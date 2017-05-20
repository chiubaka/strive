import { CompleteTask } from './index';
import { Action, Dispatch } from "redux";
import { ITask } from "../model/ITask";
import { SerenityState } from "../model/SerenityState";
const typeCache: { [label: string]: boolean } = {};

function type<T>(label: T | ""): T {
	if (typeCache[<string>label]) {
		throw new Error(`Action type "${label}" is not unique`);
	}

	typeCache[<string>label] = true;

	return <T>label;
}

export const ActionTypes = {
	COMPLETE_TASK: type<"COMPLETE_TASK">("COMPLETE_TASK"),
  REQUEST_TASKS: type<"REQUEST_TASKS">("REQUEST_TASKS"),
  RECEIVE_TASKS: type<"RECEIVE_TASKS">("RECEIVE_TASKS")
};

export type SerenityAction = CompleteTask | ReceiveTasks | RequestTasks;

enum AsyncLoadStatus {
  Loading,
  Success,
  Error
}

export interface CompleteTask extends Action {
	id: number;
}

export function completeTask(id: number): CompleteTask {
	return {
		type: ActionTypes.COMPLETE_TASK,
		id
	};
}

export interface RequestTasks extends Action {}

function requestTasks(): RequestTasks {
  return {
    type: ActionTypes.REQUEST_TASKS
  };
}

export interface ReceiveTasks extends Action {
  tasks: ITask[];
}

function receiveTasks(tasks: ITask[]) {
  return {
    type: ActionTypes.RECEIVE_TASKS,
    tasks
  };
}

export interface FetchTasks extends Action {
  status: AsyncLoadStatus;
  error?: string;
};

export function fetchTasks() {
  return (dispatch: Dispatch<SerenityState>) => {
    dispatch(requestTasks());
    return fetch("/api/tasks/")
      .then(response => response.json())
      .then(tasks => dispatch(receiveTasks(tasks)));
  }
}