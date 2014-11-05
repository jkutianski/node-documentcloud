#!/usr/bin/env node

var documentCloud = require('./commonDC');

documentCloud.search({'q' : 'argentina', 'page' : 2}, function(err,res) {
  console.log(res);
});