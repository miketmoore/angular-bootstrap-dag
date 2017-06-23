var dagre = require('dagre');

function mmGraphCtrl() {
    var vm = this;
    var _parent;
    var _parentDimensions;
    var _elem;

    angular.extend(vm, {
        activate: activate
    });

    function activate(params) {
        _elem = params.elem;
        _width = params.width;
        _height = params.height;
        console.log('mmGraphCtrl init ', vm.data);
        _parent = _elem.parent()[0];
        _calculateParentDimensions();
        _buildMap();
        _buildGraphModel();
    }

    function _calculateParentDimensions() {
        _parentDimensions = {width: _parent.clientWidth, height: _parent.clientHeight};
    }

    function _buildMap(data) {
        vm.map = {
            nodes: {},
            edges: {}
        };
        _mapNodes();
        _mapEdges();
    }

    function _mapNodes() {
        var i = 0,
            len = vm.data.nodes.length,
            node;
        for (; i < len; i++) {
            node = vm.data.nodes[i];
            vm.map.nodes[node.data.id] = node;
        }
    }

    function _mapEdges() {
        var i = 0,
            len = vm.data.edges.length,
            edge,
            key;
        for (; i < len; i++) {
            edge = vm.data.edges[i];
            key = edge.data.source + '~' + edge.data.target;
            vm.map.edges[key] = edge;
        }
    }

    function _buildGraphModel() {
        vm.graphModel = new dagre.graphlib.Graph();
        vm.graphModel.setGraph({
            rankdir: 'LR',
            ranksep: 32,
            nodesep: 50,
            marginx: 0,
            marginy: 120
        });
        vm.graphModel.setDefaultEdgeLabel(function () {
            return {};
        });
        _setNodesOnGraphModel();
        _setEdgesOnGraphModel();
        dagre.layout(vm.graphModel);
    }

    function _setNodesOnGraphModel() {
        var i = 0,
            len = vm.data.nodes.length,
            node;
        for (; i < len; i++ ) {
            node = vm.data.nodes[i];
            vm.graphModel.setNode(node.data.id, {
                label: node.data.name,
                width: _width,
                height: _height
            });
        }
    }

    function _setEdgesOnGraphModel() {
        var i = 0,
            len = vm.data.edges.length,
            edge;
        for (; i < len; i++) {
            edge = vm.data.edges[i];
            vm.graphModel.setEdge(edge.data.source, edge.data.target);
        }
    }
}

module.exports = mmGraphCtrl;