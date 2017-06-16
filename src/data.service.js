module.exports = function dataServiceFactory($q) {

    var _mock = {
        nodes: [
            { data: { id: 'n0', name: 'Input A', subtitle: 'Subtitle', type: 'danger' } },
            { data: { id: 'n1', name: 'Input A Received', subtitle: 'Subtitle', type: 'warning' } },
            { data: { id: 'n2', name: 'Process', subtitle: 'Subtitle', type: 'warning' } },
            { data: { id: 'n3', name: 'Complete', subtitle: 'Subtitle', type: 'danger' } },
            { data: { id: 'n4', name: 'Input B', subtitle: 'Subtitle', type: 'danger' } },
            { data: { id: 'n5', name: 'Input B Received', subtitle: 'Subtitle', type: 'warning' } }
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
