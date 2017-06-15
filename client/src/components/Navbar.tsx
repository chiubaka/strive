import * as React from "react";
import { Link } from "react-router-dom";
import { Popover, Position } from "@blueprintjs/core";
import UserMenu from './menus/UserMenu';

const logo = require("../../resources/img/strive_logo_no_text.png");

export class Navbar extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<nav className="pt-navbar pt-dark">
				<div className="pt-navbar-group pt-align-left branding">
          <img className="logo" src={logo}/>
					<div className="pt-navbar-heading">Strive</div>
				</div>
        <div className="pt-navbar-group center">
          <input className="pt-input" placeholder="Search tasks..." type="text" />
        </div>
				<div className="pt-navbar-group pt-align-right">
					<Link to="/app/vision"><button className="pt-button pt-minimal pt-icon-eye-open">Vision</button></Link>
					<Link to="/app/plan"><button className="pt-button pt-minimal pt-icon-swap-vertical">Plan</button></Link>
          <Link to="/app/execute"><button className="pt-button pt-minimal pt-icon-take-action">Execute</button></Link>
					<Link to="/app/reflect"><button className="pt-button pt-minimal pt-icon-dashboard">Reflect</button></Link>

					<span className="pt-navbar-divider"></span>
          <Popover content={<UserMenu/>} position={Position.BOTTOM}>
					  <button className="pt-button pt-minimal pt-icon-user"></button>
          </Popover>
					<button className="pt-button pt-minimal pt-icon-notifications"></button>
					<button className="pt-button pt-minimal pt-icon-cog"></button>
				</div>
			</nav>
		);
	}
}