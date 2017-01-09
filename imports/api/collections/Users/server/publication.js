import {Meteor} from 'meteor/meteor' 

Meteor.publish('userList', () => { 
	console.log("Publishing all Users : userList");
	return Meteor.users.find({});
});

Meteor.publish('userById', (strUserId) => {
	console.log("Publishing user with Id");
	return Meteor.users.find({_id:strUserId});
});