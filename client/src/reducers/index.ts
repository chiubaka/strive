import {  } from './../actions/index';
import { routerReducer } from "react-router-redux";
import { combineReducers, Reducer, Action } from 'redux';

import { SerenityState, SerenityFrontendState, DEFAULT_FRONTEND_STATE } from '../model/SerenityState';
import { ITask } from "../model/ITask";
import { 
  SerenityAction, 
  ActionTypes, 
  DisplayError,
  EditTaskName,
  FinishEditingTaskName,
  ReceiveTasks,
  StartEditingTaskName,
  UpdateTask,
} from './../actions/index';

function frontend(state: SerenityFrontendState = DEFAULT_FRONTEND_STATE, action: SerenityAction) {
  switch (action.type) {
    case ActionTypes.REQUEST_TASKS:
      return {...state, loading: true};
    case ActionTypes.RECEIVE_TASKS:
      return {...state, loading: false};
    case ActionTypes.START_EDITING_TASK_NAME:
      const startEditingTaskNameAction = <StartEditingTaskName> action;
      return {...state, editedTaskId: startEditingTaskNameAction.id, editedTaskName: startEditingTaskNameAction.name}
    case ActionTypes.EDIT_TASK_NAME:
      const editTaskNameAction = <EditTaskName> action;
      return {...state, editedTaskName: editTaskNameAction.name};
    case ActionTypes.FINISH_EDITING_TASK_NAME:
      return {...state, editedTaskId: null, editedTaskName: null}
    case ActionTypes.DISPLAY_ERROR:
      return {...state, loading: false, error: (<DisplayError> action).error}
    default:
      return state;
  }
}

function tasksById(state: {[id: number]: ITask} = {}, action: SerenityAction) {
	switch (action.type) {
    case ActionTypes.RECEIVE_TASKS:
      const tasks = (<ReceiveTasks> action).tasks;
      return tasks.reduce((map: {[id: number]: ITask}, task) => {
        map[task.id] = task;
        return map;
      }, {});
    case ActionTypes.UPDATE_TASK:
      const updatedTask = (<UpdateTask> action).task;
      return {...state, [updatedTask.id]: updatedTask}
		default:
			return state;
	}
}

function tasks(state: number[] = [], action: SerenityAction) {
  switch (action.type) {
    case ActionTypes.RECEIVE_TASKS:
      const tasks = (<ReceiveTasks> action).tasks;
      return tasks.map(task => task.id);
    default:
      return state;
  }
}

const serenityApp: Reducer<SerenityState> = combineReducers<SerenityState>({
	frontend: frontend,
  router: routerReducer,
  tasksById: tasksById,
	tasks: tasks,
});

export default serenityApp;