import TrackerReact from 'meteor/ultimatejs:tracker-react'
import React, {Component} from 'react'
import {ReactiveDict} from 'meteor/reactive-dict'
import { Session } from 'meteor/session'

import { UserListContainer } from '/imports/ui/features/user/userList/UserListContainer'
import { MessengerContainer } from '/imports/ui/features/messenger/messenger/MessengerContainer';

export class Homepage extends TrackerReact(Component) {

	render() {
		return (
			<div className="homepage">
				<h4>This is Homepage</h4>
				<MessengerContainer />
			</div>
		)
	}
}
