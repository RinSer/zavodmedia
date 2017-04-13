// Tests for the behavior of the videos collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Videos } from './videos.js';
/*
if (Meteor.isServer) {
  describe('videos collection', function () {
    it('insert correctly', function () {
      const videoId = Videos.insert({
        title: 'Test Video',
        url: 'http://zavodmedia.com/assets/show-f544c88ec3a3618d8c235825112d3493.mp4',
        group: 'main'
      });
      const added = Videos.find({ _id: linkId });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'videos');
      assert.equal(count, 1);
    });
  });
}
*/