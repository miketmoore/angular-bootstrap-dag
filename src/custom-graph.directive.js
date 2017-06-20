var dagre = require('dagre');

customGraph.$inject = ['$templateRequest', '$compile'];

function customGraph($templateRequest, $compile) {
    var _map,
        _parentDimensions;

    return {
        restrict: 'E',
        templateUrl: 'views/custom-graph.html',
        scope: {
            data: '='
        },
        link: link
    };

    function link($scope, elem, attrs, ctrl) {
        if ($scope.data) {
            _calculateParentDimensions(elem);
            _buildMap($scope.data);
            _build($scope, elem);
        }
    }

    function _buildMap(data) {
        _map = {
            nodes: {},
            edges: {}
        };

        data.nodes.forEach(function (n) {
            _map.nodes[n.data.id] = n;
        });
        data.edges.forEach(function (e) {
            var key = e.data.source + '~' + e.data.target;
            _map.edges[key] = e;
        });
    }

    function _calculateParentDimensions(elem) {
        var parent = elem.parent()[0];
        _parentDimensions = {width:parent.clientWidth, height:parent.clientHeight};
    }

    function _build($scope, elem) {
        var data = $scope.data,
            g = new dagre.graphlib.Graph();

        g.setGraph({
            rankdir: 'LR',
            ranksep: 32,
            nodesep: 50,
            marginx: 0,
            marginy: 120
        });

        g.setDefaultEdgeLabel(function () {
            return {};
        });

        var w = 300,
            h = 70;

        data.nodes.forEach(function (node) {
            g.setNode(node.data.id, {
                label: node.data.name,
                width: w,
                height: h
            });
        });

        data.edges.forEach(function (edge) {
            g.setEdge(edge.data.source, edge.data.target);
        });

        dagre.layout(g);

        var pad = 20;
        var xInc;
        var yInc;
        g.nodes().forEach(function (nodeId, i) {
            var node = g.node(nodeId);
            if (i == 0) {
                xInc = node.x;
                yInc = node.y;
            }
            var linkFn = $compile('<custom-graph-node data="data"></custom-graph-node>');
            var data = _map.nodes[nodeId].data;
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
                    x: node.x - xInc + pad,
                    y: node.y - yInc + pad
                }
            });
            var response = linkFn(nodeScope);
            console.log(response);
            elem.append(response);
        });
        // g.edges().forEach(function (e) {
        // console.log('Edge ' + e + ': ' + JSON.stringify(g.edge(e)));
        // });
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
};

module.exports = customGraph;
