import { composeWithTracker, composeAll } from 'react-komposer'
import { MessengerAsideUserListComponent } from './MessengerAsideUserListComponent'

const composer = (props, onData) => {

	// console.log(props);
	let arrUserList = [];
	let strSelectedUserId ;
	if(props.arrUserList) {
		arrUserList = props.arrUserList;
	}
	if(props.strSelectedUserId) {
		strSelectedUserId = props.strSelectedUserId;
	}

	onData( 
		null, 
		{
			arrUserList : arrUserList,
			strSelectedUserId : strSelectedUserId
		}
	);

}

export const MessengerAsideUserListContainer = composeWithTracker( composer )(MessengerAsideUserListComponent);