import TrackerReact from 'meteor/ultimatejs:tracker-react';
import React, {Component} from 'react';
import {Link} from 'react-router'
import { AccountsUIWrapper } from '/imports/ui/components/AccountsUIWrapper';

export class MainLayout extends TrackerReact(Component) {
	render() {
		return (
			<div className="main-layout">
				<nav>
					<div className="nav-wrapper">
						<ul className="right hide-on-med-and-down">
							<li><Link to ="/">Home</Link></li>
							<li><Link to ={"/user/"+Meteor.userId()}>Profile</Link></li>
							<li><Link to ="/userlist">User List</Link></li>
							<li><AccountsUIWrapper /></li>
						</ul>
					</div>
				</nav>
				<br/>
				<div className="container main-container">
					{ this.props.children }
				</div>
			</div>
		)
	}
}

MainLayout.propType = {
	children: React.PropTypes.element.isRequired
}
