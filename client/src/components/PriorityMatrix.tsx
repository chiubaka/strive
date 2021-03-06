import * as React from "react";
import { NonIdealState, Spinner } from "@blueprintjs/core";
import { TaskList } from "./TaskList";
import { ITask } from "../model/ITask";
import { SerenityState, tasksForIds } from '../model/SerenityState';
import { connect } from 'react-redux';

interface PriorityMatrixStateProps {
	tasks?: ITask[];
  loading?: boolean;
  error?: string;
}

declare type PriorityMatrixProps = PriorityMatrixStateProps;

class PriorityMatrix extends React.Component<PriorityMatrixProps, {}> {
	public render(): JSX.Element {
		// TODO: Filter tasks by urgency based on due date

		const importantTasks = this.props.tasks.filter(task => {
			return task.important;
		});

		const unimportantTasks = this.props.tasks.filter(task => {
			return !task.important;
		});

    let content = (
      <div className="matrix">
        <div className="important">
          <div className="pt-card pt-elevation-4 urgent">
            <TaskList tasks={[]}/>
          </div>
          <div className="pt-card pt-elevation-4">
            <TaskList tasks={importantTasks}/>
          </div>
        </div>
        <div>
          <div className="pt-card pt-elevation-1 urgent">
            <TaskList tasks={[]}/>
          </div>
          <div className="pt-card pt-elevation-1">
            <TaskList tasks={unimportantTasks}/>
          </div>
        </div>
      </div>
    );

    if (this.props.loading) {
      content = (
        <NonIdealState
          title="Loading..."
          visual={<Spinner/>}
        />
      );
    }
    else if (this.props.error) {
      content = (
        <NonIdealState
          title={this.props.error}
          visual="pt-icon-warning-sign"
        />
      );
    }

		return (
			<div className="priority-matrix">
				{content}
			</div>
		);
	}
}

function mapStateToProps(state: SerenityState): PriorityMatrixStateProps {
	return {
		tasks: tasksForIds(state.tasks, state.tasksById),
    loading: state.frontend.loading,
    error: state.frontend.error
	};
}

export default connect<PriorityMatrixStateProps, void, void>(mapStateToProps)(PriorityMatrix);