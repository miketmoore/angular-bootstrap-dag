'use strict';

require("style-loader!./stylesheet.css");
var angular = require('angular');

angular.module('app', [])
    .constant('cytoscape', require('cytoscape'))
    .directive('mmGraph', require('./graph/graph.directive.js'))
    .controller('AppCtrl', require('./app.controller.js'));
