/*jshint esversion: 6, node: true*/

'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static('public'));

var port = 3000;
app.listen(port, function () {
  console.log('App listening on port ' + port + '.');
});