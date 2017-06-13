import { ActionTypes, UpdateTask, RequestTasks, StartEditingTaskName, EditTaskName, FinishEditingTaskName } from './types';
import * as HttpStatus from "http-status-codes";

import { Dispatch } from "redux";
import { ITask } from "../model/ITask";
import { SerenityState } from "../model/SerenityState";
import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } from '../secrets';
import { store } from '../store';

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

export function startEditingTaskName(id: number, name: string): StartEditingTaskName {
  return {
    type: ActionTypes.START_EDITING_TASK_NAME,
    id,
    name,
  };
}

export function editTaskName(id: number, name: string): EditTaskName {
  return {
    type: ActionTypes.EDIT_TASK_NAME,
    id,
    name
  };
}

export function finishEditingTaskName(): FinishEditingTaskName {
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

export function updateTask(task: ITask): UpdateTask {
  return {
    type: ActionTypes.UPDATE_TASK,
    task
  };
}

function requestTasks(): RequestTasks {
  return {
    type: ActionTypes.REQUEST_TASKS
  };
}

function receiveTasks(tasks: ITask[]) {
  return {
    type: ActionTypes.RECEIVE_TASKS,
    tasks
  };
}

export function fetchTasks() {
  return (dispatch: Dispatch<SerenityState>) => {
    dispatch(requestTasks());
    return fetch("/api/tasks/", {
      headers: getApiHeaders()
    })
      .then(response => {
        if (response.status === HttpStatus.OK) {
          return response.json();
        }
        else if (response.status === HttpStatus.UNAUTHORIZED) {
          return Promise.reject("You must be logged in.");
        }
        else {
          console.warn(`Request to backend failed with status code ${response.status}.`);
          return Promise.reject("An error has occurred.");
        }
      })
      .then(tasks => dispatch(receiveTasks(tasks)))
      .catch(error => {
        dispatch(displayError(error));
      });
  };
}

function displayError(error: String) {
  return {
    type: ActionTypes.DISPLAY_ERROR,
    error
  };
}

export function submitTaskUpdate(task: ITask) {
  return (dispatch: Dispatch<SerenityState>) => {
    return fetch(`/api/tasks/${task.id}/`, {
      method: "PUT",
      headers: getApiHeaders(),
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(updatedTask => dispatch(updateTask(task)));
  }
}

// TODO: Perhaps refactor HttpClient code into a separate file/module?
function getApiHeaders() {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${store.getState().auth.accessToken}`);
  headers.append("Content-Type", "application/json");
  return headers;
}