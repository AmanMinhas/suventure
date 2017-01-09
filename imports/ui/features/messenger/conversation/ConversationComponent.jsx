import React, {Component} from 'react'

import './style.scss'

export class ConversationComponent extends Component {
	componentDidMount() {
		// console.log(this.props);
	}

	componentDidUpdate() {
		// console.log(this.props);
	}

	_sendMessage(e) {
		e.preventDefault();

		let oMessage = {
			message : this.refs.newMessage.value,
			to : this.props.strToUserId
		}

		//Reset text input value 
		this.refs.newMessage.value = "";

		// console.log(oMessage);
		if(oMessage.message !== "") {
			Meteor.call("sendMessage", oMessage, (err,res)=> {
				if(err) {
					console.log("Error ",err);
				} else {
					console.log("Res ",res);
				}
			})
		}
	}

	render() {
		console.log("Rendering ConversationComponent");
		return (
			<div className="conversation-component">
				<div className="conversation">
				{this.props.arrMessages.map((oMessage) => {
					return (<p key = {oMessage._id} ><b>{Meteor.users.findOne(oMessage.from).username} : </b> {oMessage.message} </p>);
				})}
				</div>
				{this.props.strToUserId ? 
					<div className="send-form-wrapper">
						<form name = "sendMessageForm" className="message-input-form" onSubmit = {this._sendMessage.bind(this)}>
							<div className="row mb0">
								<div className="col s9">
									<div className="input-field">
										<input type = "text" name = "newMessage" ref = "newMessage" className = "message-input" placeholder = "Type a message"/>
									</div>
								</div>
								<div className="col s3">
									<div className="input-field">
										<button className = "btn waves-effect waves-light submit-button" type="submit">Send</button>
									</div>
								</div>
							</div>
						</form>
					</div>
					: this.props.numUserListCount ? 
						<p>Please select a user from the left panel</p>
					: 	<p>No messages to display</p>
				}
			</div>
		)
	}
}
