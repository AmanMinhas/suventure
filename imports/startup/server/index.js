/*Following is Server Code*/

import {Meteor} from 'meteor/meteor'
import '/imports/api/collections/Messages/methods'

//Publish all users
import '/imports/api/collections/Users/server/publication'

//Publish all messages
import '/imports/api/collections/Messages/server/publication'
