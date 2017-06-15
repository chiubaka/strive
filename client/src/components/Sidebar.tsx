import * as React from "react";
import { Button, Popover, Position } from "@blueprintjs/core";
import StageMenu from './menus/StageMenu';

export class Sidebar extends React.Component<{}, {}> {
  public render() {
    // TODO: Display name of current stage by connecting this component to front-end state
    // TODO: Define some sort of default stage somewhere or some calculation to figure out which
    // phase to land a user on
    return (
      <aside className="sidebar">
      </aside>
    )
  }
}