#!/usr/bin/env node

var documentCloud = require('./commonDC');

documentCloud.getMetadata({'id' : '1301505-2822013-3650'}, function(err,res) {
  console.log(res);
});