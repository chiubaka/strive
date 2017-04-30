import { Action } from "redux";
import { ITask } from "../model/ITask";
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
};

export type SerenityAction = CompleteTask;

class CompleteTask implements Action {
	public type = ActionTypes.COMPLETE_TASK;
	public payload: { task: ITask };

	public constructor(task: ITask) {
		this.payload = { task };
	}
}