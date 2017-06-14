import * as React from "react";
import { Menu, MenuItem } from "@blueprintjs/core";

export default class StageMenu extends React.Component<{}, {}> {
  public render() {
    return (
      <Menu>
        <MenuItem
          iconName="eye-open"
          text="Vision"
        />
        <MenuItem
          iconName="swap-vertical"
          text="Plan"
        />
        <MenuItem
          iconName="take-action"
          text="Execute"
        />
        <MenuItem
          iconName="dashboard"
          text="Reflect"
        />
      </Menu>
    );
  }
}