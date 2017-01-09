import {ColMessages} from './messages' 

import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check'

Meteor.methods({

	sendMessage(oMessage) {
		console.log("In Method ", oMessage);
		
		check(oMessage.to, String)
		check(oMessage.message, String)
		oMessage.from = Meteor.userId();

		ColMessages.insert(oMessage, (err, id) => {
			console.log("Method Error ", err);
			console.log("Method id ", id);
			return id;
		});
	}

})
