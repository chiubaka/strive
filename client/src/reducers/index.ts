import { routerReducer } from "react-router-redux";
import { combineReducers, Reducer } from "redux";

import { SerenityState, SerenityFrontendState } from "../model/SerenityState";
import { ITask } from "../model/ITask";
import { SerenityAction, ActionTypes, CompleteTask, ReceiveTasks } from '../actions/index';

function frontend(state: SerenityFrontendState = { loading: false }, action: SerenityAction) {
  switch (action.type) {
    case ActionTypes.REQUEST_TASKS:
      return {
        loading: true
      };
    case ActionTypes.RECEIVE_TASKS:
      return {
        loading: false
      };
    default:
      return state;
  }
}

function tasksById(state: {[id: number]: ITask} = {}, action: SerenityAction) {
	switch (action.type) {
		case ActionTypes.COMPLETE_TASK:
			const task = state[(<CompleteTask> action).id];

			return {...state, [task.id]: taskReducer(task, action)}
    case ActionTypes.RECEIVE_TASKS:
      const tasks = (<ReceiveTasks> action).tasks;
      return tasks.reduce((map: {[id: number]: ITask}, task) => {
        map[task.id] = task;
        return map;
      }, {});
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

function taskReducer(state: ITask, action: SerenityAction) {
	switch (action.type) {
		case ActionTypes.COMPLETE_TASK:
			return {...state, completed: !state.completed}
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