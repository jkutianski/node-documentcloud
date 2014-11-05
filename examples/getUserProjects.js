#!/usr/bin/env node

var documentCloud = require('./commonDC');

documentCloud.getUserProjects(null, function(err,res) {
  console.log(res);
});