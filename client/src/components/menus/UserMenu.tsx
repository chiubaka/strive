import * as React from "react";
import { Menu, MenuItem } from "@blueprintjs/core";

export default class UserMenu extends React.Component<{}, {}> {
  public render() {
    return (
      <Menu>
        <MenuItem
          iconName="log-out"
          text="Logout"
          href="/logout"
        />
      </Menu>
    );
  }
}