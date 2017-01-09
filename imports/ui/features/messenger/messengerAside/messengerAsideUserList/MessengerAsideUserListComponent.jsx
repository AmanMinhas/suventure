import React, {Component} from 'react'

import './style.scss'

export class MessengerAsideUserListComponent extends Component {
	componentDidMount() {
	}

	componentDidUpdate() {
	}

	switchUser(strUserId) {
		this.props.switchConversation(strUserId);
	}

	render() {
		return (
			<div className="aside-userlist-component">
				{/*ASide Start */}
				{this.props.arrUserList.length>0 ?  
				<div>
					{this.props.arrUserList.map((oUser)=>{
						if( typeof oUser === 'undefined' || oUser === null ){
							return '';
						} else {
							if(oUser.hasOwnProperty("username")) {
								let className = "aside-user-single-component" ;
								className += oUser._id == this.props.strSelectedUserId ? " active" : "" ;
								return (
									<div 
										key = {oUser._id} 
										className = {className} 
										onClick = {this.switchUser.bind(this,oUser._id)}
										>
										{oUser.username}
									</div>
								)
							} else {
								return '';
							}
						}
					})}
				</div>
				: ''}
				{/*ASide End*/}
			</div>
		)
	}
}
