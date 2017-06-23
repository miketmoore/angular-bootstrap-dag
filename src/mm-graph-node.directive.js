mmGraphNode.$inject = [];

function mmGraphNode() {
    return {
        restrict: 'E',
        templateUrl: 'views/mm-graph-node.html',
        scope: {
            data: '='
        }
    };
}

module.exports = mmGraphNode;