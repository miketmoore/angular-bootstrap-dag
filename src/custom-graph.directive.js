module.exports = function customGraph() {
    return {
        restrict: 'E',
        templateUrl: 'views/custom-graph.html',
        scope: {
            data: '='
        },
        link: function($scope, elem, attrs, ctrl) {
            if ($scope.data) {
                _build($scope, elem);
            }
        }
    };

    function _build($scope, elem) {
    }
};
