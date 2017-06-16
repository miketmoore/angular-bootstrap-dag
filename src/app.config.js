config.$inject = ['$stateProvider'];

function config($stateProvider) {
    $stateProvider
        .state({
            name: 'cygraph',
            url: '/cygraph',
            controller: 'CyGraphCtrl',
            controllerAs: 'cyGraphCtrl',
            templateUrl: 'views/route-cy-graph.html'
        })
        .state({
            name: 'd3graph',
            url: '/d3graph',
            controller: 'D3GraphCtrl',
            controllerAs: 'd3GraphCtrl',
            templateUrl: 'views/route-d3-graph.html'
        });
}

module.exports = config;
