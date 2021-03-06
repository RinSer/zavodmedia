import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('app_body', { main: 'main_page' });
  },
});

// Add admin login
FlowRouter.route('/admin', {
  name: 'App.login',
  action() {
  	BlazeLayout.render('app_body', { main: 'login_page' });
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('app_body', { main: 'App_notFound' });
  },
};
