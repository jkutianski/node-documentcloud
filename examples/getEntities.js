#!/usr/bin/env node

var documentCloud = require('./commonDC');

documentCloud.getEntities({'id' : '717267-perie-julia-argentina-anual-2010'}, function(err,res) {
  console.log(res);
});