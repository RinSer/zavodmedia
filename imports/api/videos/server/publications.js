// All videos-related publications

import { Meteor } from 'meteor/meteor';
import { Videos } from '../videos.js';

Meteor.publish('videos.showreel', function () {
	return Videos.find({groups:'showreel'},{fields:{url:1,groups:1}});
});

Meteor.publish('videos.portfolio', function() {
	return Videos.find({groups:{$ne:'showreel'}},{sort:{createdAt:-1}, limit:5, fields:{title:1,url:1,groups:1}});
});

Meteor.publish('videos.group', function(groupName) {
	return Videos.find({groups:groupName},{fields:{title:1,url:1,groups:1}});
});
