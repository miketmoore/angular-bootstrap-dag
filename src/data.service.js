module.exports = function dataServiceFactory($q) {

    var _mock = {
        nodes: [
            { data: { id: 'n0', name: 'Input A', subtitle: 'Subtitle', type: 'input' } },
            { data: { id: 'n1', name: 'Input A Received', type: 'receipt', percentage: 88 } },
            { data: { id: 'n2', name: 'Process', subtitle: 'Subtitle' } },
            { data: { id: 'n3', name: 'Complete', subtitle: 'Subtitle', type: 'final' } },
            { data: { id: 'n4', name: 'Input B', subtitle: 'Subtitle', type: 'input' } },
            { data: { id: 'n5', name: 'Input B Received', type: 'receipt', percentage: 25 } }
        ],
        edges: [
            { data: { source: 'n0', target: 'n1' } },
            { data: { source: 'n1', target: 'n2' } },
            { data: { source: 'n2', target: 'n3' } },
            { data: { source: 'n4', target: 'n5' } },
            { data: { source: 'n5', target: 'n2' } }
        ]
    };

    var service = {
        get: get
    };

    return service;

    function get() {
        return $q(function(resolve) {
            resolve(_mock);
        });
    }
};
