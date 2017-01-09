import { composeWithTracker, composeAll } from 'react-komposer'
import { UserListComponent } from './UserListComponent'

const composer = (props, onData) => {

	const subscription = Meteor.subscribe("userList") ;

	if(subscription.ready()) {
		const arrUsers = Meteor.users.find().fetch();
		onData( null, {arrUsers})
	}
}

export const UserListContainer = composeAll( composeWithTracker( composer ) )(UserListComponent)
