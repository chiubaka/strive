export interface ITask {
	id: number;
	name: string;
	completed: boolean;
	important: boolean;
}

export const DUMMY_TASKS = [
	{
		id: 0,
		name: "Create a task manager!",
		completed: false,
		important: true
	},
	{
		id: 1,
		name: "Be awesome while doing it",
		completed: true,
		important: false
	}
];