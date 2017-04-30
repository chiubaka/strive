import { ITask, DUMMY_TASKS } from "./ITask";

export interface SerenityState {
	tasksById: {[id: number]: ITask};
	tasks: number[];
}

export const DEFAULT_STATE = {
	tasksById: DUMMY_TASKS.reduce((map: {[id: number]: ITask}, task: ITask) => {
		map[task.id] = task;
		return map;
	}, {}),
	tasks: DUMMY_TASKS.map(task => task.id)
};