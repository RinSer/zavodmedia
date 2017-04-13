import { Meteor } from 'meteor/meteor';
import { Videos } from '/imports/api/videos/videos.js';
import './mvid.html';


Template.mvid.onCreated(function() {
	this.autorun(() => {this.subscribe('videos.main')});
});

Template.mvid.helpers({
	mainVideo() {
		return Videos.findOne().url;
	},
});