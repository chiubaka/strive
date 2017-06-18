import * as React from "react";

interface SidebarSectionProps {
  name: string;
}

export default class SidebarSection extends React.Component<SidebarSectionProps, {}> {
  public render() {
    return (
      <section>
        <hr/>
        <h2>{this.props.name}</h2>
        {this.props.children}
      </section>
    );
  }
}