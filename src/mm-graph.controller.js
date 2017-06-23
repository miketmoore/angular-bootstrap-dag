var dagre = require('dagre');

mmGraphCtrl.$inject = ['mmGraphService'];

function mmGraphCtrl(mmGraphService) {
    var vm = this;

    angular.extend(vm, {
        activate: activate
    });

    function activate(params) {
        // var gm = mmGraphService.getInstance({
        //     data: vm.data,
        //     containerLayout: params.containerLayout,
        //     // Don't allow rankdir to be overridden
        //     graphLayout: angular.extend(params.graphLayout, { rankdir: 'LR'}),
        //     nodeLayout: params.nodeLayout
        // });
        // _buildGraphModel();
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