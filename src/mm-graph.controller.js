var dagre = require('dagre');

function mmGraphCtrl() {
    var vm = this;

    angular.extend(vm, {
        setNodes: setNodes,
        getNodes: getNodes,
        setEdges: setEdges,
        getEdges: getEdges
    });

    function setNodes(nodes) {
        vm.nodes = nodes;
    }

    function getNodes() {
        return vm.nodes;
    }

    function setEdges(edges) {
        vm.edges = edges;
    }

    function getEdges() {
        return vm.edges;
    }
}

module.exports = mmGraphCtrl;