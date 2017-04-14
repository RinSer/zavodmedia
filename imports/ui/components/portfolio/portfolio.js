import { Meteor } from 'meteor/meteor';
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
		event.preventDefault();
		Session.set('group', event.target.id);
		Template.instance().start.set(false);
	},
	'click h3'(event, template) {
		event.preventDefault();
		console.log('click');
		$('#addVideo').toggle();
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
		return Videos.findOne({groups:{$ne:'showreel'}}).url;
	},
	smallVideos() {
		return Videos.find({groups:{$ne:'showreel'}},{skip:1,limit:4}).fetch();
	}
});

// groups portfolio body template
Template.portfolioGroup.onCreated(function() {
	this.getgroup = () => Session.get('group');
	this.autorun(() => {
		this.subscribe('videos.group', this.getgroup());
	});
});

Template.portfolioGroup.helpers({
	videos() {
		let current = Session.get('group');
		return Videos.find({groups:current}).fetch();
	}
});

// Add video template events
Template.videoForm.events({
	'submit #newVideo'(event, template) {
		event.preventDefault();
		let url = event.target.url.value;
		let title = event.target.title.value;
		var groups = [];
		$('input[type=checkbox]:checked').each(function(index) {
			groups.push($(this).val());
		});
		if (groups.length < 1) {
			$('#newVideo').effect('shake');
		} else {
			Meteor.call('video.add', title, url, groups, function(error, result) {
				if (error) {
					$('#newVideo').effect('shake');
				} else {
					alert('Видео успешно добавлено!');
					$('#addVideo').hide();
				}
			});
		}
	}
});

// Add each video template events
Template.portfolioGroupVideo.events({
	'click .deleteVideo'(event, template) {
		event.preventDefault();
		let video_id = template.data.video._id;
		console.log(video_id);
		Meteor.call('video.delete', video_id, function(error, result) {
			if (error) {
				alert('Что-то пошло не так!');
			}
		});
	}
});