'use strict';

require("style-loader!./stylesheet.scss");
var angular = require('angular');
var ngAnimate = require('angular-animate');
var uirouter = require('angular-ui-router');
var uibootstrap = require('angular-ui-bootstrap');

angular.module('app', ['ngAnimate', 'ui.router', 'ui.bootstrap'])
    .factory('dataService', require('./data.service'))

    .controller('AppCtrl', require('./app.controller'))

    .controller('CustomGraphCtrl', require('./custom-graph.controller'))
    .directive('customGraphNode', require('./custom-graph-node.directive'))
    .directive('mmGraph', require('./mm-graph.directive'))

    .config(require('./app.config'));
