'use strict';

require("style-loader!./stylesheet.scss");
var angular = require('angular');
var ngAnimate = require('angular-animate');
var uibootstrap = require('angular-ui-bootstrap');

angular.module('app', ['ngAnimate', 'ui.bootstrap'])
    .factory('dataService', require('./data.service'))

    .controller('AppCtrl', require('./app.controller'))

    .controller('CustomGraphCtrl', require('./custom-graph.controller'))
    .factory('mmGraphService', require('./mm-graph.service'))
    .controller('mmGraphCtrl', require('./mm-graph.controller'))
    .directive('mmGraphNode', require('./mm-graph-node.directive'))
    .directive('mmGraph', require('./mm-graph.directive'));
