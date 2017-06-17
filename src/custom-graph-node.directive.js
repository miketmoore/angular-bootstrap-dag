customGraphNode.$inject = [];

function customGraphNode() {
    return {
        restrict: 'E',
        templateUrl: 'views/custom-graph-node.html',
        scope: {
            data: '='
        },
        link: function (scope, elem) {
            console.log('customGraphNode ', scope.data);
            console.log(scope.data.height, scope.data.width);
            // elem.css({
            //     width: scope.data.width + 'px',
            //     height: scope.data.height  + 'px',
            //     top: scope.data.y + 'px',
            //     left: scope.data.x  + 'px'
            // });
        }
    };
}

module.exports = customGraphNode;