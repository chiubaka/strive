export interface ITask {
	name: string;
	completed: boolean;
	important: boolean;
}

export const DUMMY_TASKS = [
	{
		name: "Create a task manager!",
		completed: false,
		important: true
	},
	{
		name: "Be awesome while doing it",
		completed: true,
		important: false
	}
];