import React, {Component} from 'react'
import {ConversationContainer} from '../conversation/ConversationContainer';
import {MessengerAsideUserListContainer} from '../messengerAside/messengerAsideUserList/MessengerAsideUserListContainer'
import { Session } from 'meteor/session'

import './style.scss'

export class MessengerComponent extends Component {
	componentDidMount() {
		if(this.props.strToUserId) {
			Session.set("strToUserId" , this.props.strToUserId)
			this.forceUpdate();
		}
	}

	componentWillUnmount() {
		console.log("Unmounting MessengerComponent");
		Session.set("strToUserId" , "") 
	}

	switchConversation(strUserId) {
		// console.log("Switch to "+ Meteor.users.findOne(strUserId).username);
		Session.set("strToUserId",strUserId);

		/*To forcefully rerender the component*/
		this.forceUpdate();
	}

	render() {
		console.log("Rendering MessengerComponent");
		return (
			<div className = "messenger-component">
				<div className="row mb0">
					<nav className = "messenger-nav">
						<a href="#" className="brand-logo">Messenger</a>
					</nav>
				</div>
				<div className="messenger-container row z-depth-5">
					<div className="col s12 m4 l3 aside-user-list-wrapper">
						{/*ASide Start*/}
						<MessengerAsideUserListContainer arrUserList = {this.props.arrUserList} strSelectedUserId = {Session.get("strToUserId")} switchConversation = {this.switchConversation.bind(this)}/>
						{/*ASide End*/}
					</div>

					<div className="col s12 m8 l9 pos-relative conversation-container-wrapper">
						{/*Conversation Start*/}
						<ConversationContainer strToUserId = {Session.get("strToUserId")} numUserListCount = {this.props.arrUserList.length}/>
						{/*Conversation End*/}
					</div>
				</div>
			</div>
		)
	}
}
