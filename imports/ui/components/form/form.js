import { Meteor } from 'meteor/meteor';
import './form.html';


Template.form.events({
	'submit #emailForm'(event, template) {
		event.preventDefault();
		console.log(event.target.zm.value);
		console.log(event.target.email.value);
		console.log(event.target.message.value);
		let zm = 'serj.dukareff@gmail.com';
		let email = event.target.email.value;
		let message = event.target.message.value;
		Meteor.call('sendForm', zm, email, 'Форма с сайта.', message, function(error, result) {
			if (error) {
				console.log(error);
				alert('Форма не смогла быть отправлена!');
			} else {
				 console.log(result);
				 alert('Форма успешно отправлена!');
				 event.target.email.value = "";
				 event.target.message.value = "";
			}
		})
	}
});