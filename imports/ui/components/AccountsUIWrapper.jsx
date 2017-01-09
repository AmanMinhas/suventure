import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Template} from 'meteor/templating'
import {Blaze} from 'meteor/blaze'
import { Session } from 'meteor/session'
import { Router, browserHistory } from 'react-router';

export class AccountsUIWrapper extends Component {
	
	componentDidMount() {
		//Show dropdown if user is not logged in.
		//Don't show dropdown if user is logged in.
		if(!Meteor.userId()) {
			Session.set("Meteor.loginButtons.dropdownVisible", true);
		} else {
			Session.set("Meteor.loginButtons.dropdownVisible", false);
		}

		// Use Meteor Blaze to render login buttons
		this.view = Blaze.render(
			Template.loginButtons,
			ReactDOM.findDOMNode(this.refs.loginButtonsContainer)
		);

		Accounts.onLogin(()=> {
			
			if(Meteor.userId()) {

				if(typeof this.props.location !== 'undefined') {
					if(typeof this.props.location.state !== 'undefined') {
						if(this.props.location.state.nextPathname) {
							browserHistory.push(this.props.location.state.nextPathname);
						}
					}
				}

				let strCurrentPath = browserHistory.getCurrentLocation().pathname;
				if(strCurrentPath == "/login") {
					browserHistory.push('/');				
				} else {
					browserHistory.push(strCurrentPath);				
				}
				
			}
		})

		Accounts.onLogout(()=>{
			Session.set("Meteor.loginButtons.dropdownVisible", true);
			browserHistory.push('/login');
		})
	}

	componentWillUnmount() {
		//Clean up view.
		Blaze.remove(this.view);
	}

	render() {
		let strClassName = "login-buttons-container center-login-form";

		// Just render a placeholder loginButtonsContainer that will be filled in
		return <div ref="loginButtonsContainer" className = {strClassName} />;	
	}
}