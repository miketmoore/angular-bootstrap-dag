var dagre = require('dagre');

mmGraph.$inject = ['mmGraphService'];

function mmGraph(mmGraphService) {

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
            ctrl.setNodes(_drawNodes(gm));
            ctrl.setEdges(_drawEdgesSimple(gm));
        }
    }

    function _drawNodes(graphModel) {
        var nodeIds = graphModel.getNodeIds(),
            nodeId,
            node,
            i = 0,
            len = nodeIds.length,
            viewNodes = [];
        for (; i < len; i++) {
            nodeId = nodeIds[i];
            node = graphModel.getNodeById(nodeId);
            viewNodes.push({
                title: node.data.name,
                subtitle: node.data.subtitle,
                titleClass: _getTitleClass(node.data.type),
                iconClass: _getIconClass(node.data.type),
                percentage: angular.isNumber(node.data.percentage) ? node.data.percentage : undefined,
                percentageLabel: 'Percentage:',
                height: node.layout.height,
                width: node.layout.width,
                x: node.layout.x,
                y: node.layout.y
            });
        }
        return viewNodes;
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
