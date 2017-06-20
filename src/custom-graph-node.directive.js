customGraphNode.$inject = [];

function customGraphNode() {
    return {
        restrict: 'E',
        templateUrl: 'views/custom-graph-node.html',
        scope: {
            data: '='
        }
    };
}

module.exports = customGraphNode;