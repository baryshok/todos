import { Meteor } from 'meteor/meteor';
import { Profilers, TaskEvent, logInColor } from '@astraload/profilers';
import { getInstanceName } from '/imports/api/profilers/server/helpers';

function handleCpuProfileCreated({ instanceName, fileName, filePath }) {
  logInColor(`CPU profile created: ${filePath}`);
}

function handleHeapSnapshotCreated({ instanceName, fileName, filePath }) {
  logInColor(`Heap snapshot created: ${filePath}`);
}

Meteor.startup(() => {
  const profilers = new Profilers();
  profilers.on(TaskEvent.CpuProfileCreated, handleCpuProfileCreated);
  profilers.on(TaskEvent.HeapSnapshotCreated, handleHeapSnapshotCreated);
  const instanceName = getInstanceName();
  profilers.startObserving(instanceName);
});
