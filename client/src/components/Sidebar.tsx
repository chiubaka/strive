import * as React from "react";

const logo = require("../../resources/img/strive_logo_no_text.png");

export class Sidebar extends React.Component<{}, {}> {
  public render() {
    return (
      <aside className="sidebar">
        <img className="logo" src={logo}/>
      </aside>
    )
  }
}