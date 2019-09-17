module.exports = {
  name: 'click-prevent',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/click-prevent',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
