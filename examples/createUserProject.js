#!/usr/bin/env node

var documentCloud = require('./commonDC.js');

documentCloud.createUserProject({'title' : 'testAPI', 'description' : 'description test'}, function(err,res) {
  console.log(res);
});