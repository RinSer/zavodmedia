import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({
	'youtube.get'(url) {
		try {
			return HTTP.get(url);
		} catch (err) {
			return err;
		}
	}
});