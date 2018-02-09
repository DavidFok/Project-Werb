/*
 * Copyright 2013. Amazon Web Services, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
**/

// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('node-uuid');

AWS.config.correctClockSkew = true;
AWS.config.loadFromPath('./awscreds.json');

AWS.config.apiVersions = {
  comprehend: '2017-11-27',
  // other service API versions
};

var comprehend = new AWS.Comprehend();

var params = {
  LanguageCode: 'en', /* required */
  Text: 'Aberdeen Centre has good asian stuff' /* re.quired */
};
comprehend.detectEntities(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});