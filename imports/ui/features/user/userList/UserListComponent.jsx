import React, {Component} from 'react'
import {Link} from 'react-router'

export class UserListComponent extends Component {

	render() {
		return (
			<div className="user-list-component">
				<h4>List of Users </h4>
				{this.props.arrUsers.length > 1 ? 
				<div className = "user-list-div">
					{this.props.arrUsers.map((oUser)=>{
						if(oUser._id != Meteor.userId()) {
							//Following html in return statement can be places in a new component UserSingleComponent if need be.
							return (
								<div 
									key = {oUser._id} 
									className = "row"
									>
									<div className="col s12 m6">
										<div className="card z-depth-5">
											<div className="card-content">
												<span className="card-title black-text">
													{oUser.username}
												</span>
											</div>
											<div className="card-action">
												<Link to = {'/message/'+oUser._id}>Send Message</Link>
												<Link to = {'/user/'+oUser._id}> Profile</Link>
											</div>
										</div>
									</div>
								</div>
							)
						}
					})}
				</div>
				: <p>No users to display</p> }
			</div>
		)
	}
}
