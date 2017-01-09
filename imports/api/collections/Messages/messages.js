import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export const ColMessages = new Mongo.Collection('messages');

ColMessages.allow({
	insert: () => false,
	update: () => false,
	remove: () => false,
});

ColMessages.deny({
	insert: () => true,
	update: () => true,
	remove: () => true,
});

let oMessageSchema = new SimpleSchema({
	'from' : {
		type : String //UserId of the sender
	},
	'to' : {
		type : String, //UserId of the receiver
		optional : false
	},
	'message': {
		type : String
	},
	'timestamp' : {
		type : Date,
		autoValue 	: function() {
			return new Date();
		}
	}
});

ColMessages.attachSchema( oMessageSchema );