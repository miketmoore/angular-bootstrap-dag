var dagre = require('dagre');

mmGraph.$inject = ['$templateRequest', '$compile', 'mmGraphService'];

function mmGraph($templateRequest, $compile, mmGraphService) {
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
            var parent = elem.parent()[0];
            var gm = mmGraphService.getInstance({
                data: ctrl.data,
                containerLayout: {
                    width: parent.clientWidth,
                    height: parent.clientHeight
                },
                graphLayout: {
                    ranksep: 32,
                    nodesep: 50,
                    marginx: 0,
                    marginy: 120
                },
                nodeLayout: {
                    width: 300,
                    height: 70
                }
            });
            _drawNodes($scope, elem, gm);
            _drawEdgesSimple($scope, gm);
        }
    }

    function _drawNodes($scope, elem, graphModel) {
        var nodeIds = graphModel.getNodeIds(),
            nodeId,
            nodeLayout,
            data,
            tpl = '<mm-graph-node data="data"></mm-graph-node>',
            linkFn,
            nodeScope,
            i = 0,
            len = nodeIds.length;
        for (; i < len; i++) {
            nodeId = nodeIds[i];
            nodeLayout = graphModel.getNodeLayout(nodeId);
            data = graphModel.getNodeById(nodeId).data;
            linkFn = $compile(tpl),
            nodeScope = $scope.$new(true);
            angular.extend(nodeScope, {
                data: {
                    title: data.name,
                    subtitle: data.subtitle,
                    titleClass: _getTitleClass(data.type),
                    iconClass: _getIconClass(data.type),
                    percentage: angular.isNumber(data.percentage) ? data.percentage : undefined,
                    percentageLabel: 'Percentage:',
                    height: nodeLayout.height,
                    width: nodeLayout.width,
                    x: nodeLayout.x,
                    y: nodeLayout.y
                }
            });
            elem.find('.nodes').append(linkFn(nodeScope));
        }
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
        var edges = graphModel.getEdges();
        edges.forEach(function (e) {
            var layoutSource = graphModel.getNodeLayout(e.v);
            var layoutTarget = graphModel.getNodeLayout(e.w);
            $scope.edges.push({
                x1: layoutSource.x + layoutSource.width,
                y1: layoutSource.y + (layoutSource.height / 2),
                x2: layoutTarget.x,
                y2: layoutTarget.y + (layoutTarget.height / 2)
            });
        });
    }

};

module.exports = mmGraph;
