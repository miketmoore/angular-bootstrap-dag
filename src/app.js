'use strict';

require("style-loader!./stylesheet.css");
var angular = require('angular');
var uirouter = require('angular-ui-router');

angular.module('app', ['ui.router'])
    .factory('dataService', require('./data.service'))

    .controller('AppCtrl', require('./app.controller'))

    .directive('d3Graph', require('./d3-graph.directive'))
    .controller('D3GraphCtrl', require('./d3-graph.controller'))

    .controller('CyGraphCtrl', require('./cy-graph.controller'))
    .directive('cyGraph', require('./cy-graph.directive'))

    .controller('CustomGraphCtrl', require('./custom-graph.controller'))
    .directive('customGraph', require('./custom-graph.directive'))

    .config(require('./app.config'));
