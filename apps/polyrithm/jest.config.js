module.exports = {
  name: 'polyrithm',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/polyrithm',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
