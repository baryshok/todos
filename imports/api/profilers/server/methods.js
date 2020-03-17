import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Profilers } from '@astraload/profilers';

Meteor.methods({
  createCpuProfile(instanceName, duration, samplingInterval) {
    check(instanceName, String);
    check(duration, Match.Optional(Match.Integer));
    check(samplingInterval, Match.Optional(Match.Integer));
    Meteor.defer(() => {
      const profilers = new Profilers();
      profilers.cpu.scheduleTask(instanceName, duration, samplingInterval);
    });
  },
  createHeapSnapshot(instanceName) {
    check(instanceName, String);
    Meteor.defer(() => {
      const profilers = new Profilers();
      profilers.heap.scheduleTask(instanceName);
    });
  },
});
