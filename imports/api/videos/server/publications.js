// All videos-related publications

import { Meteor } from 'meteor/meteor';
import { Videos } from '../videos.js';

Meteor.publish('videos.main', function () {
	return Videos.find({group:'main'},{fields:{url:1,group:1}});
});

Meteor.publish('videos.portfolio', function() {
	return Videos.find({group:{$ne:'main'}},{sort:{createdAt:-1}, limit:5, fields:{title:1,url:1,group:1}});
});

Meteor.publish('videos.group', function(groupName) {
	return Videos.find({group:groupName},{fields:{title:1,url:1,group:1}});
});