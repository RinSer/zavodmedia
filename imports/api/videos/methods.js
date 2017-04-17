// Methods related to videos

import { Meteor } from 'meteor/meteor';
import { Videos } from './videos.js';


Meteor.methods({
	'video.add'(title, url, groups) {
		return Videos.insert({
			title,
			url,
			groups,
			createdAt: new Date()
		});
	},

	'video.delete'(id) {
		return Videos.remove({_id:id});
	},

	'video.update'(id, params) {
		return Videos.update({_id:id},{$set:{params}});
	}
});