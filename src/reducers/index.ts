import { ITask } from "../model/ITask";
import { SerenityAction, ActionTypes } from '../actions/index';
import { combineReducers } from "redux";

function tasksById(state: {[id: number]: ITask} = {}, action: SerenityAction) {
	switch (action.type) {
		case ActionTypes.COMPLETE_TASK:
			const task = state[action.id];
			
			return {...state, [task.id]: taskReducer(task, action)}
		default:
			return state;
	}
}

function tasks(state: number[] = []) {
	return state;
}

function taskReducer(state: ITask, action: SerenityAction) {
	switch (action.type) {
		case ActionTypes.COMPLETE_TASK:
			return {...state, completed: !state.completed}
		default:
			return state;
	}
}

const serenityApp = combineReducers({
	tasksById: tasksById,
	tasks: tasks
});

export default serenityApp;