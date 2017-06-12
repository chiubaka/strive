import { RouterState } from "react-router-redux";
import { ITask, DUMMY_TASKS } from "./ITask";
import { AuthState, getExistingAuthState } from '../auth/model/AuthenticationState';

export interface SerenityState extends AuthState{
	frontend: SerenityFrontendState;
  router?: RouterState;
  tasksById?: {[id: number]: ITask};
	tasks?: number[];
}

export interface SerenityFrontendState {
  editedTaskId?: number;
  editedTaskName?: string;
  error?: string;
  loading: boolean;
}

export const DEFAULT_FRONTEND_STATE: SerenityFrontendState = {
  loading: false,
}

export function tasksForIds(ids: number[], tasksById: {[id: number]: ITask}): ITask[] {
	return ids.map(id => tasksById[id]);
}

export function getExistingState(): SerenityState {
  return {
    auth: getExistingAuthState(),
    frontend: DEFAULT_FRONTEND_STATE,
  };
}