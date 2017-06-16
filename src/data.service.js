module.exports = function dataServiceFactory($q) {
    var _mock = {
        nodes: [
            { data: { id: 'n0', name: 'Input A' } },
            { data: { id: 'n1', name: 'Input A Received' } },
            { data: { id: 'n2', name: 'Process' } },
            { data: { id: 'n3', name: 'Complete' } },
            { data: { id: 'n4', name: 'Input B' } },
            { data: { id: 'n5', name: 'Input B Received' } }
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
