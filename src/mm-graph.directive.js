var dagre = require('dagre');

mmGraph.$inject = ['$templateRequest', '$compile'];

function mmGraph($templateRequest, $compile) {
    var _map,
        _parentDimensions;

    return {
        restrict: 'E',
        templateUrl: 'views/mm-graph.html',
        controller: 'mmGraphCtrl',
        controllerAs: 'mmGraphCtrl',
        scope: true,
        bindToController: {
            data: '='
        },
        link: link
    };

    function link($scope, elem, attrs, ctrl) {
        if (ctrl.data) {
            ctrl.activate({
                elem: elem,
                width: 300,
                height: 70
            });
            _drawNodes($scope, elem, ctrl.map, ctrl.graphModel);
            _drawEdgesSimple($scope, ctrl.graphModel);
        }
    }

    function _drawNodes($scope, elem, map, graphModel) {
        graphModel.nodes().forEach(function (nodeId, i) {
            var node = graphModel.node(nodeId);
            var linkFn = $compile('<mm-graph-node data="data"></mm-graph-node>');
            var data = map.nodes[nodeId].data;
            var nodeScope = $scope.$new(true);
            angular.extend(nodeScope, {
                data: {
                    title: data.name,
                    subtitle: data.subtitle,
                    titleClass: _getTitleClass(data.type),
                    iconClass: _getIconClass(data.type),
                    percentage: angular.isNumber(data.percentage) ? data.percentage : undefined,
                    percentageLabel: 'Percentage:',
                    height: node.height,
                    width: node.width,
                    x: node.x,
                    y: node.y
                }
            });
            elem.find('.nodes').append(linkFn(nodeScope));
        });
    }

    function _getTitleClass(type) {
        var c = ['title'];
        if (angular.isString(type)) {
            if (type === 'input' || type === 'final') {
                c.push('danger');
            } else if (type === 'receipt') {
                c.push('warning');
            }
        } else {
            c.push('warning');
        }
        return c.join(' ');
    }

    function _getIconClass(type) {
        var c = ['icon', 'glyphicon'];
        if (angular.isString(type)) {
            if (type === 'input') {
                c.push('glyphicon-inbox');
            } else if (type === 'final') {
                c.push('glyphicon-hdd');
            }
        }
        return c.join(' ');
    }

    function _drawEdgesSimple($scope, graphModel) {
        $scope.edges = [];
        graphModel.edges().forEach(function (e) {
            var layoutSource = graphModel.node(e.v);
            var layoutTarget = graphModel.node(e.w);
            $scope.edges.push({
                x1 : layoutSource.x + layoutSource.width,
                y1 : layoutSource.y + (layoutSource.height / 2),
                x2 : layoutTarget.x,
                y2 : layoutTarget.y + (layoutTarget.height / 2)
            });
        });
    }

};

module.exports = mmGraph;
