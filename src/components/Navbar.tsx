import * as React from "react";

export class Navbar extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<nav className="pt-navbar pt-dark pt-fixed-top">
				<div className="pt-navbar-group pt-align-left">
					<div className="pt-navbar-heading">Serenity</div>
					<input className="pt-input" placeholder="Search tasks..." type="text" />
				</div>
				<div className="pt-navbar-group pt-align-right">
					<button className="pt-button pt-minimal pt-icon-home">Home</button>
					<span className="pt-navbar-divider"></span>
					<button className="pt-button pt-minimal pt-icon-user"></button>
					<button className="pt-button pt-minimal pt-icon-notifications"></button>
					<button className="pt-button pt-minimal pt-icon-cog"></button>
				</div>
			</nav>
		);
	}
}