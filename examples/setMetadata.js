#!/usr/bin/env node

var documentCloud = require('./commonDC');

documentCloud.setMetadata({'id' : '1301505-2822013-3650', 'description' : 'test'}, function(err,res) {
  console.log(res);
});