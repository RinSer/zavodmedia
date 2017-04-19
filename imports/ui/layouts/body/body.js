import { Meteor } from 'meteor/meteor';
import './body.html';


Meteor.startup(function() {
	$('html').attr('lang', 'ru');
});