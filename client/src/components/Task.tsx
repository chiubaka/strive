import * as React from "react";
import { ITask } from "../model/ITask";
import { Checkbox, EditableText } from "@blueprintjs/core";
import { SerenityState } from '../model/SerenityState';
import { Action, Dispatch } from 'redux';
import { completeTask, markImportant, startEditingTaskName, editTaskName, finishEditingTaskName, changeTaskName } from '../actions/index';

interface TaskStateProps {
  task: ITask;
  isEditing: boolean;
  currentName: string;
}

interface TaskDispatchProps {
  onComplete: () => void;
  markImportant: () => void;
  onNameEdit: () => void;
  onNameChange: (name: string) => void;
  onNameConfirm: (name: string) => void;
  onNameCancel: (name: string) => void;
}

export declare type TaskProps = TaskStateProps & TaskDispatchProps;

export class Task extends React.Component<TaskProps, {}> {
  public static mapStateToProps(task: ITask): (state: SerenityState) => TaskStateProps {
    return (state: SerenityState) => {
      return {
        task: task,
        isEditing: state.frontend.editedTaskId === task.id,
        currentName: state.frontend.editedTaskName,
      };
    };
  }

  public static mapDispatchToProps(task: ITask): (dispatch: (action: Action) => void) => TaskDispatchProps {
    return (dispatch: Dispatch<SerenityState>) => {
      return {
        onComplete: () => {
          dispatch(completeTask(task));
        },
        markImportant: () => {
          dispatch(markImportant(task));
        },
        onNameEdit: () => {
          dispatch(startEditingTaskName(task.id, task.name));
        },
        onNameChange: (name: string) => {
          dispatch(editTaskName(task.id, name));
        },
        onNameConfirm: (name: string) => {
          if (name.length > 0) {
            dispatch(changeTaskName(task, name));
          }
          else {
            dispatch(editTaskName(task.id, task.name));
            dispatch(finishEditingTaskName());
          }
        },
        onNameCancel: (name: string) => {
          dispatch(editTaskName(task.id, task.name));
          dispatch(finishEditingTaskName());
        }
      };
    };
  }
  
  public render(): JSX.Element {
    const task = this.props.task;

    return (
      <li className="task">
        <Checkbox
          checked={task.completed}
          onChange={this.props.onComplete.bind(this)}
        />
        <span 
          className={"pt-icon-standard pt-icon-star" + (task.important ? "" : "-empty")}
          onClick={this.props.markImportant.bind(this)}
        />
        <EditableText
          value={this.props.isEditing ? this.props.currentName : this.props.task.name}
          isEditing={this.props.isEditing}
          onEdit={this.props.onNameEdit.bind(this)}
          onChange={this.props.onNameChange.bind(this)}
          onConfirm={this.props.onNameConfirm.bind(this)}
          onCancel={this.props.onNameCancel.bind(this)}
        />
      </li>
    );
  }
}
