import * as React from "react";
import { connect } from "react-redux";
import { Link, Switch, Route } from "react-router-dom"
import { Navbar } from "./Navbar";
import { DUMMY_TASKS } from "../model/ITask";
import { PriorityMatrixPage } from "./pages/PriorityMatrixPage";
import { Dispatch } from 'redux';
import { SerenityState } from '../model/SerenityState';
import { fetchTasks } from '../actions/index';
import { Sidebar } from './Sidebar';

interface SerenityAppDispatchProps {
  onLoad?: () => void;
}

declare type SerenityAppProps = SerenityAppDispatchProps;

class SerenityApp extends React.Component<SerenityAppProps, {}> {
  public componentWillMount() {
    this.props.onLoad();
  }
  
  public render(): JSX.Element {
		return (
			<div className="serenity">
        <Navbar/>
				<div className="content">
          <Sidebar/>
					<Switch>
						<Route exact path="/app">
              <div>
                Home!
              </div>
            </Route>
						<Route path="/app/priority-matrix" component={PriorityMatrixPage}/>
					</Switch>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch: Dispatch<SerenityState>): SerenityAppDispatchProps {
  return {
    onLoad: () => {
      dispatch(fetchTasks())
    }
  };
}

export default connect(null, mapDispatchToProps)(SerenityApp);