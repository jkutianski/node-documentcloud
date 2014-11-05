/*
    DocumentCloud.js - Node JS DocumentCloud.org Client library

    This library is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This library is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this library.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
 * Module dependencies
 */

var request = require('superagent'),
  util = require('util'),
  endpoints = require('./endpoints.json');

/*
 * Constructor
 *
 * @param {auth} DocumentCloud basic auth
 * @return {Object} new instance
 */

function DocumentCloud(auth) {
  this.auth = (auth) ? auth.map(function(item) {
    return encodeURIComponent(item);
  }) : '';
  return this;
};

/*
 * Version
 */

DocumentCloud.version = '0.1.0';

/*
 * Create DocumentCloud prototypes
 */

Object.keys(endpoints).forEach(function(key) {
  DocumentCloud.prototype[key] = function(params, callback) {
    if ("function" == typeof params) {
      callback = params;
      params = {};
    }
    preProcess(params);
    APIRequest.call(this, key, endpoints[key], params, callback);
    return this;
  };
});

/*
 * Process API requests
 */

var APIRequest = function(callName, endpoint, params, callback) {
  var self = this;


  // filter missing parameters
  var missingParameter = (endpoint.required) ? endpoint.required.filter(function(requiredParam) {
    return Object.keys(params).indexOf(requiredParam)
  }) : [];

  if (missingParameter.length) {

    callback(missingParameter, {
      'error': 'Missing parameter',
      'status': 417,
      'description': 'You didn\'t provide the required parameter(s) "' + missingParameter.join(", ") + '" for the call "' + callName + '()".'
    });

  } else {

    // add auth & supply url vars
    var url = (function(urlArray) {
        return urlArray[0] + "://"
          // add authentication
          + ((self.auth) ? self.auth.join(":") + '@' : '') + urlArray[1];
      })(endpoint.resource.split("://")),
      url_vars = endpoint.resource.match(/\/:\w+/g) || [];

    // solve URL vars
    url_vars.forEach(function(url_var) {
      url = url.replace(url_var, '/' + params[url_var.substr(2)]);
    });

    // generate request
    var req = request(endpoint.method, url)
      .query(params)
      .set('Accept', '*/*')
      .set('User-Agent', 'DocumentCloud Client lib for Node.js (' + DocumentCloud.version + ')')
      .buffer(true)
      .end(function(res) {
      var response = (Object.keys(res.body).length) ? res.body : res.text;
      // execute callback on response
      callback(res.error, response, res.statusCode);
    });
  }
};

/*
 * Preprocess params
 */

var preProcess = function(obj) {
  for (var i in obj) {
    if (util.isArray(obj[i])) {
      obj[i] = obj[i].join(',');
    }
  }
};

/*
 * Export new constructor wrapper
 */

module.exports = function(auth) {
  return new DocumentCloud(auth);
};