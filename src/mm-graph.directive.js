var dagre = require('dagre');

mmGraph.$inject = ['$compile', 'mmGraphService'];

function mmGraph($compile, mmGraphService) {

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
            var scopeFactory = function () {
                return $scope.$new(true);
            };
            _drawNodes(scopeFactory, elem, gm);
            ctrl.edges = _drawEdgesSimple(gm);
        }
    }

    function _drawNodes(scopeFactory, elem, graphModel) {
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
            linkFn = $compile(tpl);
            nodeScope = scopeFactory();
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

    function _drawEdgesSimple(graphModel) {
        var viewEdges = [],
            edges = graphModel.getEdges(),
            edge,
            i = 0,
            len = edges.length,
            source,
            target;
        for (; i < len; i++) {
            edge = edges[i];
            source = graphModel.getNodeLayout(edge.v);
            target = graphModel.getNodeLayout(edge.w);
            viewEdges.push({
                x1: source.x + source.width,
                y1: source.y + (source.height / 2),
                x2: target.x,
                y2: target.y + (target.height / 2)
            });
        }
        return viewEdges;
    }

}

module.exports = mmGraph;
