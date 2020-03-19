/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ComputedField } from 'meteor/peerlibrary:computed-field';

import { Todos } from '../todos.js';
import { Lists } from '../../lists/lists.js';


Meteor.publish('todos.inList', function todosInList(params) {
  new SimpleSchema({
    listId: { type: String },
  }).validate(params);

  const getList = new ComputedField(() => {
    const { listId } = params;
    const { userId } = this;

    const orSelectors = [{ userId: { $exists: false }}];
    if (userId) {
      orSelectors.push({ userId });
    }

    const query = {
      _id: listId,
      $or: orSelectors,
    };

    const options = {
      fields: { _id: 1 },
      sort: { _id: 1 },
      ordered: false,
    };

    return Lists.findOne(query, options);
  });

  this.autorun(() => {
    const list = getList();
    if (!list) return this.ready();
    return Todos.find({ listId: list._id }, { fields: Todos.publicFields });
  });

  // this.onStop(() => {
  //   getList.stop();
  // });
});
