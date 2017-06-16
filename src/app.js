'use strict';

require("style-loader!./stylesheet.css");
var angular = require('angular');
var uirouter = require('angular-ui-router');

angular.module('app', ['ui.router'])
    .factory('dataService', require('./data.service'))
    .directive('cyGraph', require('./cy-graph.directive'))
    .directive('d3Graph', require('./d3-graph.directive'))
    .controller('AppCtrl', require('./app.controller'))
    .controller('CyGraphCtrl', require('./cy-graph.controller'))
    .controller('D3GraphCtrl', require('./d3-graph.controller'))
    .config(require('./app.config'));
