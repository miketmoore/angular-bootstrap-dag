var dagre = require('dagre');

module.exports = function customGraph() {
    var map;

    return {
        restrict: 'E',
        templateUrl: 'views/custom-graph.html',
        scope: {
            data: '='
        },
        link: function($scope, elem, attrs, ctrl) {
            if ($scope.data) {
                _buildMap($scope.data);
                _build($scope, elem);
            }
        }
    };

    function _buildMap(data) {
       map = {
           nodes: {},
           edges: {}
       };

       data.nodes.forEach(function (n) {
           map.nodes[n.data.id] = n;
       });
       data.edges.forEach(function (e) {
           var key = e.data.source + '~' + e.data.target;
           map.edges[key] = e;
       });
    }

    function _build($scope, elem) {
        var data = $scope.data,
            g = new dagre.graphlib.Graph();

        g.setGraph({
            rankdir:'LR',
            ranksep: 50,
            nodesep: 50,
            marginx: 0,
            marginy: 150
        });

        g.setDefaultEdgeLabel(function () {
            return {};
        });

        var w = 300,
            h = 90;

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

        g.nodes().forEach(function (v) {
            var node = g.node(v);
            elem.append(_buildHtmlNode(v, node));
        });
        g.edges().forEach(function (e) {
            console.log('Edge ' + e + ': ' + JSON.stringify(g.edge(e)));
        });

    }

    function _buildHtmlNode(nodeId, node) {
        var data = map.nodes[nodeId];
        console.log(nodeId, node, data);
        var str = '<div class="node" style="width: ' + node.width + '; height: ' + node.height + '; top: ' + node.y + '; left: ' + node.x + '">';

        var titleClass = ['title'];
        var type = data.data.type;
        if (angular.isString(type)) {
            if (type === 'input' || type === 'final') {
                titleClass.push('danger');
            }
        } else {
            titleClass.push('warning');
        }
        str += '<div class="' + titleClass.join(' ') + '">' + data.data.name + '</div>';

        str += '<div class="subtitle">' + data.data.subtitle + '</div>';

        var iconClass = ['icon', 'glyphicon'];
        if (angular.isString(type)) {
            if (type === 'input') {
                iconClass.push('glyphicon-inbox');
            } else if (type === 'final') {
                iconClass.push('glyphicon-hdd');
            }
        }
        str += '<i class="' + iconClass.join(' ') + '"></i>';

        str += '</div>';

        return str;
    }

};
