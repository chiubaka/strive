import { StartEditingTaskName, EditTaskName, FinishEditingTaskName } from './index';
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
  REQUEST_TASKS: type<"REQUEST_TASKS">("REQUEST_TASKS"),
  RECEIVE_TASKS: type<"RECEIVE_TASKS">("RECEIVE_TASKS"),
  UPDATE_TASK: type<"UPDATE_TASK">("UPDATE_TASK"),
  START_EDITING_TASK_NAME: type<"START_EDITING_TASK_NAME">("START_EDITING_TASK_NAME"),
  EDIT_TASK_NAME: type<"EDIT_TASK_NAME">("EDIT_TASK_NAME"),
  FINISH_EDITING_TASK_NAME: type<"FINISH_EDITING_TASK_NAME">("FINISH_EDITING_TASK_NAME"),
};

export type SerenityAction = ReceiveTasks | RequestTasks | UpdateTask | StartEditingTaskName 
  | EditTaskName | FinishEditingTaskName;

enum AsyncLoadStatus {
  Loading,
  Success,
  Error
}

export function completeTask(task: ITask) {
	return (dispatch: Dispatch<SerenityState>) => {
    task.completed = !task.completed;
    return dispatch(submitTaskUpdate(task));
  };
}

export function markImportant(task: ITask) {
  return (dispatch: Dispatch<SerenityState>) => {
    task.important = !task.important;
    return dispatch(submitTaskUpdate(task));
  };
}

export interface StartEditingTaskName extends Action {
  id: number,
  name: string,
}

export function startEditingTaskName(id: number, name: string) {
  return {
    type: ActionTypes.START_EDITING_TASK_NAME,
    id,
    name,
  };
}

export interface EditTaskName extends Action {
  id: number;
  name: string;
}

export function editTaskName(id: number, name: string) {
  return {
    type: ActionTypes.EDIT_TASK_NAME,
    id,
    name
  };
}

export interface FinishEditingTaskName extends Action {};

export function finishEditingTaskName() {
  return {
    type: ActionTypes.FINISH_EDITING_TASK_NAME,
  };
}

export function changeTaskName(task: ITask, name: string) {
  return (dispatch: Dispatch<SerenityState>) => {
    task.name = name;
    return dispatch(submitTaskUpdate(task)).then(() => {
      dispatch(finishEditingTaskName());
    });
  };
}

export interface UpdateTask extends Action {
  task: ITask;
}

export function updateTask(task: ITask): UpdateTask {
  return {
    type: ActionTypes.UPDATE_TASK,
    task
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
  };
}

export function submitTaskUpdate(task: ITask) {
  return (dispatch: Dispatch<SerenityState>) => {
    return fetch(`/api/tasks/${task.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(updatedTask => dispatch(updateTask(task)));
  }
}