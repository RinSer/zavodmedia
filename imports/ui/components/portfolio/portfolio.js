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
		return Videos.findOne({groups:{$ne:'showreel'}},{sort:{createdAt:-1}}).url;
	},
	smallVideos() {
		return Videos.find({groups:{$ne:'showreel'}},{sort:{createdAt:-1},skip:1,limit:4}).fetch();
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
		return Videos.find({groups:current},{sort:{createdAt:-1}}).fetch();
	}
});

// Add video template events
Template.videoForm.onCreated(function() {
	this.error = new ReactiveVar(false);
	this.vid = new ReactiveVar(false);
	this.update = new ReactiveVar(false);
});

Template.videoForm.onRendered(function() {
	var self = this;
	// Update form if necessary
	if (this.data.video) {
		this.update.set(true);
		let urlEmbed = this.data.video.url;
		let url = 'https://youtu.be/'+urlEmbed.replace(/^(.+)embed\//, '');
		$('input[name="url"]').val(url);
		$('input[name="url"]').trigger('blur');
		console.log(this);
		this.vid.set(true);
	}
	// Handle events
	$('input[type=url]').blur(function() {
		self.error.set(false);
		let url = $(this).val();
		if (url.indexOf('youtu') > -1) {
			self.vid.set(true);
			// Remove url params
			if (url.indexOf('&') > -1) {
				url = url.split('&')[0];
			}
			// Extract video ID
			let vid = url.replace(/^(.+)\.be\/|^(.+)\?v\=/i, '');
			let jsonUrl = 'https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v='+vid+'&format=json'
			console.log(jsonUrl);
			// Get the JSON with video info
			Meteor.call('youtube.get', jsonUrl, function(error, data) {
				if (error) {
					console.log(error);
				}
				console.log(data);
				$('#vidTitle').append(data.data.title);
				$('#vidPreview').html(data.data.html);
			});
		} else {
			self.error.set(true);
		}
	});
});

Template.videoForm.helpers({
	error() {
		return Template.instance().error.get();
	},

	vid() {
		return Template.instance().vid.get();
	},

	update() {
		return Template.instance().update.get();
	}
});

Template.videoForm.events({
	'submit #newVideo'(event, template) {
		event.preventDefault();
		let urlRaw = event.target.url.value;
		// Remove url params
		if (urlRaw.indexOf('&') > -1) {
			urlRaw = urlRaw.split('&')[0];
		}
		// Extract video ID
		let vid = urlRaw.replace(/^(.+)\.be\/|^(.+)\?v\=/i, '');
		let url = 'https://www.youtube.com/embed/'+vid;
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
Template.portfolioGroupVideo.onCreated(function() {
	this.show = new ReactiveVar(true);
});

Template.portfolioGroupVideo.helpers({
	showVideo() {
		return Template.instance().show.get();
	}
});

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
	},

	'click .changeVideo'(event, template) {
		event.preventDefault();
		let current = template.show.get();
		if (current) {
			$(template.find('.changeVideo')).text('Отменить');
		} else {
			$(template.find('.changeVideo')).text('Редактировать');
		}
		template.show.set(!current);
	}
});