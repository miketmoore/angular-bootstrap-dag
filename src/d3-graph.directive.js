module.exports = function cyGraph() {
    return {
        restrict: 'E',
        templateUrl: 'views/d3-graph.html',
        scope: {
            data: '='
        },
        link: function($scope, elem, attrs, ctrl) {
            if ($scope.data) {
                _build(elem, $scope.data);
            }
        }
    };

    function _build(elem, data) {
    }
};
