'use strict';

require("style-loader!./stylesheet.css");
var angular = require('angular');

angular.module('app', [])
    .factory('dataService', require('./data/data.service.js'))
    .directive('cyGraph', require('./graph/graph.directive.js'))
    .controller('AppCtrl', require('./app.controller.js'));
