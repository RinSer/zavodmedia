import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Videos } from '/imports/api/videos/videos.js';
import './portfolio.html';

// Main portfolio template
Template.portfolio.onCreated(function() {
	this.start = new ReactiveVar(true);
});

Template.portfolio.helpers({
	start() {
		return Template.instance().start.get();
	}
});

Template.portfolio.events({
	'click li'(event, template) {
		event.preventDefault;
		Session.set('group', event.target.id);
		Template.instance().start.set(false);
	}
});

// Starter portfolio body template
Template.portfolioStart.onCreated(function() {
	this.autorun(() => {
		this.subscribe('videos.portfolio');
	});
});

Template.portfolioStart.helpers({
	bigVideo() {
		return Videos.findOne({group:{$ne:'main'}}).url;
	},
	smallVideos() {
		return Videos.find({group:{$ne:'main'}},{skip:1,limit:4}).fetch();
	}
});

// Group portfolio body template
Template.portfolioGroup.onCreated(function() {
	this.getGroup = () => Session.get('group');
	this.autorun(() => {
		this.subscribe('videos.group', this.getGroup());
	});
});

Template.portfolioGroup.helpers({
	videos() {
		let current = Session.get('group');
		return Videos.find({group:current}).fetch();
	}
});