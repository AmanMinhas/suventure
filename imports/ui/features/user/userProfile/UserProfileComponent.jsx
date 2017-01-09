import React, {Component} from 'react'
import {MessengerContainer} from '/imports/ui/features/messenger/messenger/MessengerContainer'


export class UserProfileComponent extends Component {
	componentDidMount() {
		// console.log(this.props);
	}

	render() {
		return (
			<div className="user-profile-component">
				{this.props.oUser?
					<div key = {this.props.oUser._id} className = "row" >
						<div className="col s12 m6">
							<div className="card z-depth-5">
								<div className="card-content">
									<span className="card-title black-text">
										User Profile Page <br/> 
										{this.props.oUser.username}
									</span>
								</div>
								<div className = "card-action">
									Some more user data
								</div>
							</div>
						</div>
					</div>
				:''}

				{this.props.strUserId ? 
				<MessengerContainer userid = {this.props.strUserId} />
				: '' }
			</div>
		)
	}
}
