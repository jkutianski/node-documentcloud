#!/usr/bin/env node

var documentCloud = require('./commonDC.js');

documentCloud.createUserProject({
	'title': 'testAPI',
	'description': 'description test'
}, function(err, res) {
	console.log({'create': res});

	if (res.project.id) {
		documentCloud.deleteUserProject({'id': res.project.id}, function(err2, res2, stat2) {
			console.log({'delete': [res2, stat2]});
		});
	}
});