import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './login.html';


Template.login_page.events({
	'submit #loginForm'(event, template) {
		event.preventDefault();
		let userName = event.target.user.value;
		let userPassword = event.target.password.value;
		Meteor.loginWithPassword(userName, userPassword, function(error, result) {
			if (error) {
				$('#loginForm').effect('shake');
			} else {
				FlowRouter.go('/');
			}
		});
	}
});