'use strict';

var angular = require('angular');
var cytoscape = require('cytoscape');

angular.module('app', [])
    .directive('mmGraph', require('./graph/graph.directive.js'))
    .controller('AppCtrl', require('./app.controller.js'));
