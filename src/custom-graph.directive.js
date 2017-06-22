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
        _parentDimensions = {width: parent.clientWidth, height: parent.clientHeight};
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
                    x: node.x,
                    y: node.y
                    // x: node.x - xInc,
                    // y: node.y - 35
                    // x: node.x - xInc + pad,
                    // y: node.y - yInc + pad
                }
            });
            elem.find('.nodes').append(linkFn(nodeScope));
        });

        _drawEdgesSimple($scope, g);
        _drawEdgesComplex($scope, g);
    }

    function _drawEdgesSimple($scope, g) {
        $scope.edges = [];
        g.edges().forEach(function (e) {
            var layoutSource = g.node(e.v);
            var layoutTarget = g.node(e.w);
            $scope.edges.push({
                x1 : layoutSource.x + layoutSource.width,
                y1 : layoutSource.y + (layoutSource.height / 2),
                x2 : layoutTarget.x,
                y2 : layoutTarget.y + (layoutTarget.height / 2)
            });
        });
    }

    function _drawEdgesComplex($scope, g) {
        $scope.edges = [];
        g.edges().forEach(function (e) {
            var layoutSource = g.node(e.v);
            var layoutTarget = g.node(e.w);
            var coords = {
                x1 : layoutSource.x + layoutSource.width,
                y1 : layoutSource.y + (layoutSource.height / 2),
                x2 : layoutTarget.x,
                y2 : layoutTarget.y + (layoutTarget.height / 2)
            };
            if (coords.y1 === coords.y2) {
                $scope.edges.push(coords);
            } else if (coords.y2 > coords.y1) {
                // getting complicated
                // 1) draw across x halfway
                // 2) draw down y
                // 3) draw across x halfway
                var e1 = {
                    x1: coords.x1,
                    y1: coords.y1,
                    x2: coords.x1 + ((coords.x2 - coords.x1) / 2),
                    y2: coords.y1
                };
                var e2 = {
                    x1: e1.x2,
                    y1: e1.y2,
                    x2: e1.x2,
                    y2: coords.y2
                };
                var e3 = {
                    x1: e2.x2,
                    y1: coords.y2,
                    x2: coords.x2,
                    y2: coords.y2
                };
                $scope.edges = $scope.edges.concat([e1,e2,e3]);
            }
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
};

module.exports = customGraph;
