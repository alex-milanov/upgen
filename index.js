'use strict';

const path = require('path');

// rx
const Rx = require('rx');
const RxNode = require('rx-node');

// rx adapters
const fse = require('./util/rx-fse');
const prompt = require('./util/rx-prompt');

const structure = {
	src: ['js', 'sass'],
	dist: ['js', 'css']
};

const parseStructure = (basePath, obj) => {
	let paths = [];
	if (typeof obj === 'object') {
		if (obj instanceof Array) {
			paths = obj.map(p => path.join(basePath, p));
		} else {
			paths = Object.keys(obj)
				.reduce((p, k) => p.concat(
					parseStructure(path.join(basePath, k), obj[k])
				), []);
		}
	}
	return paths;
};

const basePath = path.join(__dirname, 'sandbox');

const createDirs$ = Rx.Observable.from(parseStructure(basePath, structure))
	.map(p => {console.log(p); return fse.mkdirp(p);})
	.concatAll();

prompt.get({
	'name': 'choice',
	'description': 'selection:\n1. create dirs\n2. remove dirs\nchoose',
	'type': 'number'
}).subscribe(resp => {
	console.log(resp.choice);
	switch (resp.choice){
		case 1:
			createDirs$.subscribe(() => {});
		break;
	}
});
