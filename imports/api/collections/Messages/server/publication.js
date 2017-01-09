import {Meteor} from 'meteor/meteor' 
import {ColMessages} from '../messages'

Meteor.publish('allMessages', () => { 
	console.log("Publishing all Messages : allMessages");
	return ColMessages.find({});
});

Meteor.publish('usersAllConvesations', (strUserId) => {
	console.log("Publishing all conversations of a user  : usersAllConvesations");
	let oQuery = {
		$or : [{from : strUserId} , {to : strUserId}]
	};

	let oSort = { sort : { timestamp : 1 } };

	// console.log(ColMessages.find(oQuery, oSort).fetch());

	return ColMessages.find(oQuery, oSort);
});

Meteor.publish('conversation', (id1, id2) => {

	let oQuery = {
		$or : [
			{ from : id1, to : id2 } ,
			{ from : id2, to : id1 } 
		]
	};

	let oSort = { sort : { timestamp : 1 } };

	// console.log(ColMessages.find(oQuery, oSort).fetch());

	return ColMessages.find(oQuery, oSort);

});