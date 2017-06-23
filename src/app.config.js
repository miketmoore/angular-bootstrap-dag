config.$inject = ['$stateProvider'];

function config($stateProvider) {
    $stateProvider
        .state({
            name: 'customGraph',
            url: '/custom-graph',
            controller: 'CustomGraphCtrl',
            controllerAs: 'customGraphCtrl',
            templateUrl: 'views/route-custom-graph.html'
        });
}

module.exports = config;
