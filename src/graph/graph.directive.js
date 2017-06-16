var cytoscape = require('cytoscape');
var dagre = require('dagre');
var cydagre = require('cytoscape-dagre');
cydagre(cytoscape);

module.exports = function cyGraph() {
    return {
        restrict: 'E',
        templateUrl: 'views/graph/graph.html',
        scope: {
            data: '='
        },
        link: function($scope, elem, attrs, ctrl) {
            if ($scope.data) {
                _build(elem, $scope.data);
            }
        }
    };

    function _build(elem, data) {
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
            nodes: data.nodes,
            edges: data.edges 
          },
        });
        cy.resize();
    }
};
