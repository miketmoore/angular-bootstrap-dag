module.exports = function dataServiceFactory($q) {
    var danger = '#E92D18',
        warning = '#ACD11F';

    var _mock = {
        nodes: [
            { data: { id: 'n0', name: 'Input A', type: danger } },
            { data: { id: 'n1', name: 'Input A Received', type: warning } },
            { data: { id: 'n2', name: 'Process', type: warning } },
            { data: { id: 'n3', name: 'Complete', type: danger } },
            { data: { id: 'n4', name: 'Input B', type: danger } },
            { data: { id: 'n5', name: 'Input B Received', type: warning } }
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
