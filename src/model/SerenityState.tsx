import { ITask, DUMMY_TASKS } from "./ITask";

export interface SerenityState {
	tasksById: {[id: number]: ITask};
	tasks: number[];
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