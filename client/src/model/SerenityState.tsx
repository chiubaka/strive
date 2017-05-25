import { RouterState } from "react-router-redux";
import { ITask, DUMMY_TASKS } from "./ITask";

export interface SerenityState {
	frontend: SerenityFrontendState;
  router: RouterState;
  tasksById: {[id: number]: ITask};
	tasks: number[];
}

export interface SerenityFrontendState {
  loading: boolean;
  editedTaskId: number;
  editedTaskName: string;
}

export const DEFAULT_FRONTEND_STATE: SerenityFrontendState = {
  loading: false,
  editedTaskId: null,
  editedTaskName: null,
}

export function tasksForIds(ids: number[], tasksById: {[id: number]: ITask}): ITask[] {
	return ids.map(id => tasksById[id]);
}

export const DEFAULT_STATE = {
	tasksById: DUMMY_TASKS.reduce((map: {[id: number]: ITask}, task: ITask) => {
		map[task.id] = task;
		return map;
	}, {}),
	tasks: DUMMY_TASKS.map(task => task.id)
};