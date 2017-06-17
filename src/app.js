'use strict';

require("style-loader!./stylesheet.css");
var angular = require('angular');
var ngAnimate = require('angular-animate');
var uirouter = require('angular-ui-router');
var uibootstrap = require('angular-ui-bootstrap');

angular.module('app', ['ngAnimate', 'ui.router', 'ui.bootstrap'])
    .factory('dataService', require('./data.service'))

    .controller('AppCtrl', require('./app.controller'))

    .directive('d3Graph', require('./d3-graph.directive'))
    .controller('D3GraphCtrl', require('./d3-graph.controller'))

    .controller('CyGraphCtrl', require('./cy-graph.controller'))
    .directive('cyGraph', require('./cy-graph.directive'))

    .controller('CustomGraphCtrl', require('./custom-graph.controller'))
    .directive('customGraphNode', require('./custom-graph-node.directive'))
    .directive('customGraph', require('./custom-graph.directive'))

    .config(require('./app.config'));
