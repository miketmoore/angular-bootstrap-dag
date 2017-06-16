config.$inject = ['$stateProvider'];

function config($stateProvider) {
    $stateProvider
        .state({
            name: 'cyGraph',
            url: '/cy-graph',
            controller: 'CyGraphCtrl',
            controllerAs: 'cyGraphCtrl',
            templateUrl: 'views/route-cy-graph.html'
        })
        .state({
            name: 'dagreD3',
            url: '/dagre-d3',
            controller: 'D3GraphCtrl',
            controllerAs: 'd3GraphCtrl',
            templateUrl: 'views/route-d3-graph.html'
        })
        .state({
            name: 'customGraph',
            url: '/custom-graph',
            controller: 'CustomGraphCtrl',
            controllerAs: 'customGraphCtrl',
            templateUrl: 'views/route-custom-graph.html'
        });
}

module.exports = config;
