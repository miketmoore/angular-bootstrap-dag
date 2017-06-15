module.exports = function mmGraph() {
    return {
        restrict: 'E',
        templateUrl: 'views/graph/graph.html',
        link: function(scope, elem, attrs, ctrl) {
            elem.html('mmGraph');
        }
    };
};
