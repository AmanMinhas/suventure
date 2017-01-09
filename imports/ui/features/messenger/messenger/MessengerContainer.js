import { composeWithTracker, composeAll } from 'react-komposer'
import { MessengerComponent } from './MessengerComponent'
import { ColMessages } from '/imports/api/collections/Messages/messages'

const composer = (props, onData) => {

	let strToUserId ;
	let oToUser;
	let arrUserList = [];

	let boolShowAllUserConversations = false;

	if ((props.hasOwnProperty("params") || props.userid) && !boolShowAllUserConversations) {
		//From /message or /user

		if(props.hasOwnProperty("params")) {
			if(props.params.userid) {
				strToUserId = props.params.userid;
			}
		} else {
			if(props.userid != Meteor.userId()) {
				strToUserId = props.userid;
			}
		}

		if(strToUserId) {
			let subscription = Meteor.subscribe("userById", strToUserId);
			
			if(subscription.ready()) {
				oToUser = Meteor.users.findOne(strToUserId);
				if(oToUser) {
					arrUserList.push(oToUser);
				}

				onData( 
					null, 
					{
						strToUserId: strToUserId,
						arrUserList : arrUserList
					}
				);
			}
		} else {
			boolShowAllUserConversations = true;
		}	
	} else {
		boolShowAllUserConversations = true;
	}

	if(boolShowAllUserConversations) {
		//Else create messenger with all users current user has had a conversation with
		let subscription = Meteor.subscribe("usersAllConvesations", Meteor.userId());

		if(subscription.ready()) {
			let arrUserIds = [];
			let oQuery = {
				$or : [
					{ from : Meteor.userId()} , { to : Meteor.userId() } 
				]
			};

			let oFileds = {fields: {to: 1, from:1} }

			const arrToFromUserIds = ColMessages.find(oQuery, oFileds).fetch();

			arrToFromUserIds.map((oToFromUserIds)=> {
				if(oToFromUserIds.from == Meteor.userId()) {
					if (!arrUserIds.includes(oToFromUserIds.to)) {
						arrUserIds.push(oToFromUserIds.to)

						let userSubscriptionTo = Meteor.subscribe("userById", oToFromUserIds.to)
						if(userSubscriptionTo.ready()) {
							arrUserList.push(Meteor.users.findOne(oToFromUserIds.to));
						}
					}
				} else {
					if (!arrUserIds.includes(oToFromUserIds.from)) {
						arrUserIds.push(oToFromUserIds.from)
						let userSubscriptionFrom = Meteor.subscribe("userById", oToFromUserIds.from)
						if(userSubscriptionFrom.ready()) {
							arrUserList.push(Meteor.users.findOne(oToFromUserIds.from));
						}
					}
				}
			})

			onData(null, {arrUserList});
		}

	}

	if(props.arrUserList) {
		onData(null, {arrUserList});
	}
}

export const MessengerContainer = composeAll( composeWithTracker( composer ) )(MessengerComponent)
