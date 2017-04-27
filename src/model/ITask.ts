export interface ITask {
	name: string;
	completed: boolean;
}

export const DUMMY_TASKS = [
	{
		name: "Create a task manager!",
		completed: false
	},
	{
		name: "Be awesome while doing it",
		completed: true
	}
];