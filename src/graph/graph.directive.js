var cytoscape = require('cytoscape');
var dagre = require('dagre');
var cydagre = require('cytoscape-dagre');
cydagre(cytoscape);

module.exports = function mmGraph() {
    return {
        restrict: 'E',
        templateUrl: 'views/graph/graph.html',
        link: function(scope, elem, attrs, ctrl) {
            _build(elem);
        }
    };

    function _build(elem) {
        var cy = cytoscape({
            container: elem,

          boxSelectionEnabled: false,
          autounselectify: true,

          layout: {
            name: 'dagre',
            nodeSep: 2,
            edgeSep: 2,
            rankSep: 2,
            rankDir: 'LR',
            animate: true,
            animationDuration: 700,
            animationEasing: 'ease-in-out'
          },

          style: [
            {
              selector: 'node',
              style: {
                'content': 'data(id)',
                'text-opacity': 0.5,
                'width': 70,
                'height': 30,
                'shape': 'square',
                'text-valign': 'center',
                'text-halign': 'right',
                'background-color': 'white',
                'border-width': 0.25,
                'border-color': '#b1b1b1',
                'label': 'data(name)',
                'font-size': 4,
                'text-halign': 'center',
              }
            },

            {
              selector: 'edge',
              style: {
                'width': 0.5,
                'target-arrow-shape': 'triangle',
                'line-color': '#b1b1b1',
                'target-arrow-color': '#9dbaea'
              }
            }
          ],

          elements: {
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
          },
        });
        cy.resize();
    }
};
