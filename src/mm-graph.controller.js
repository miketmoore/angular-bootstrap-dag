var dagre = require('dagre');

function mmGraphCtrl() {
    var vm = this;

    angular.extend(vm, {
        getEdges: getEdges
    });

    function getEdges() {
        return vm.edges;
    }
}

module.exports = mmGraphCtrl;