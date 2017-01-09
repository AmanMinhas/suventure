import { composeWithTracker, composeAll } from 'react-komposer'
import { UserProfileComponent } from './UserProfileComponent'

const composer = (props, onData) => {

	let strUserId ;
	if(props.params.userid) {
		strUserId = props.params.userid;
	}

	let subscription = Meteor.subscribe("userById", strUserId);
		
	if(subscription.ready()) {

		let oUser ;
		oUser = Meteor.users.findOne(strUserId);

		onData(
			null,
			{
				strUserId : strUserId,
				oUser : oUser
			}
		)
		
	}


}

export const UserProfileContainer = composeAll( composeWithTracker( composer ) )(UserProfileComponent)
