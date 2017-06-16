'use strict';

require("style-loader!./stylesheet.css");
var angular = require('angular');

angular.module('app', [])
    .factory('dataService', require('./data.service.js'))
    .directive('cyGraph', require('./cy-graph.directive.js'))
    .controller('AppCtrl', require('./app.controller.js'));
