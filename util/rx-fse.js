'use strict';

const path = require('path');
const fse = require('fs-extra');

const Rx = require('rx');
const RxNode = require('rx-node');

const walk = (basePath) => RxNode.fromStream(fse.walk(basePath), 'end');
const readFile = Rx.Observable.fromNodeCallback(fse.readFile);

const mkdirp = Rx.Observable.fromNodeCallback(fse.mkdirp);

module.exports = {
  walk,
  readFile,
  mkdirp
};
