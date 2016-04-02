'use strict';

const Rx = require('rx');

const prompt = require('prompt');

prompt.message = '';
prompt.start();

const get = Rx.Observable.fromNodeCallback(prompt.get, prompt);

module.exports = {
  get: get
};
