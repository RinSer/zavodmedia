// Definition of Videos collection

import { Mongo } from 'meteor/mongo';
//import { SimpleSchema } from 'aldeed/simple-schema';

export const Videos = new Mongo.Collection('videos');


/*Videos.schema = new SimpleSchema({
	title: {type: String},
	url: {type: String},
	group: {type: String}
})*/