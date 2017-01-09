import { composeWithTracker, composeAll } from 'react-komposer'
import { ConversationComponent } from './ConversationComponent'
import { ColMessages } from '/imports/api/collections/Messages/messages'

const composer = (props, onData) => {

	let strToUserId ;
	let numUserListCount = 0;

	if(props.strToUserId) {
		strToUserId = props.strToUserId;
	}
	if(props.numUserListCount) {
		numUserListCount = props.numUserListCount;
	}

	let subscription = Meteor.subscribe("conversation", Meteor.userId(), strToUserId  );

	if(subscription.ready()) {
		let strUserId1 = Meteor.userId();
		let strUserId2 = strToUserId;

		let oQuery = {
			$or : [
				{ from : strUserId1, to : strUserId2 } ,
				{ from : strUserId2, to : strUserId1 } 
			]
		};
		let oSort = { sort : { timestamp : 1 } };

		const arrMessages = ColMessages.find(oQuery, oSort).fetch();
	
		onData( 
			null, 
			{
				strToUserId,
				arrMessages,
				numUserListCount
			}
		);
	}

}

export const ConversationContainer = composeAll( composeWithTracker( composer ) )(ConversationComponent)
