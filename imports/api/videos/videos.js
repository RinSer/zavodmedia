// Definition of Videos collection

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Videos = new Mongo.Collection('videos');


Videos.schema = new SimpleSchema({
	title: {type: String},
	url: {type: String},
	groups: {type: [String]},
	createdAt: {type: Date}
});

// Validate the schema automatically
Videos.attachSchema(Videos.schema);