import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

// Method for client to send email forms
Meteor.methods({
	sendForm(to, from, subject, text) {
		// Check the user inputs
		check([to,from,subject,text],[String]);
		// Let other method calls from the same client start running, without
    	// waiting for the email sending to complete.
    	this.unblock();
    	// Send the email
    	Email.send({to,from,subject,text});
	}
});
