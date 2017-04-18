import { Meteor } from 'meteor/meteor';
import { Videos } from '/imports/api/videos/videos.js';
import './mvid.html';
import '../loader/gears.html';


Template.mvid.onCreated(function() {
	this.autorun(() => {this.subscribe('videos.showreel')});
});

Template.mvid.helpers({
	mainVideo() {
		return Videos.findOne().url+'?enablejsapi=1&rel=0&showinfo=0&autoplay=1';
	},
});