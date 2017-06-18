import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Popover, Position } from "@blueprintjs/core";
import StageMenu from './menus/StageMenu';

export class Sidebar extends React.Component<{}, {}> {
  public render() {
    // TODO: Display name of current stage by connecting this component to front-end state
    // TODO: Define some sort of default stage somewhere or some calculation to figure out which
    // phase to land a user on
    return (
      <aside className="sidebar">
        <Link to="/app/execute/inbox">
          <Button 
            className="pt-button pt-minimal pt-fill pt-large"
            iconName="inbox"
          >
            Inbox
          </Button>
        </Link>
        <hr/>
        <Link to="/app/execute/next">
          <Button 
            className="pt-button pt-minimal pt-fill pt-large"
            iconName="chevron-right"
          >
            Next
          </Button>
        </Link>
        <Link to="/app/execute/waiting">
          <Button 
            className="pt-button pt-minimal pt-fill pt-large"
            iconName="blocked-person"
          >
            Waiting
          </Button>
        </Link>
        <Link to="/app/execute/scheduled">
          <Button 
            className="pt-button pt-minimal pt-fill pt-large"
            iconName="calendar"
          >
            Scheduled
          </Button>
        </Link>
        <hr/>
        <Link to="/app/execute/projects/0">
          <Button 
            className="pt-button pt-minimal pt-fill pt-large"
            iconName="projects"
          >
            Project
          </Button>
        </Link>
        <hr/>
        <Link to="/app/execute/lists">
          <Button 
            className="pt-button pt-minimal pt-fill pt-large"
            iconName="list"
          >
            Reference List
          </Button>
        </Link>
        <hr/>
        <Link to="/app/execute/someday">
          <Button 
            className="pt-button pt-minimal pt-fill pt-large"
            iconName="moon"
          >
            Someday
          </Button>
        </Link>

      </aside>
    )
  }
}