var dagre = require('dagre');

function mmGraphServiceFactory() {
    var GraphModel = function (params) {
        this.data = params.data;
        this.nodeLayout = params.nodeLayout;
        this.map = {nodes: {}, edges: {}};
        this.mapNodes();
        this.mapEdges();
        this.graphModel = new dagre.graphlib.Graph();
        if (!angular.isObject(params.graphLayout)) {
            params.graphLayout = {};
        }
        this.graphModel.setGraph(angular.extend(params.graphLayout, {
            rankdir: 'LR'
        }));
        this.graphModel.setDefaultEdgeLabel(function () {
            return {};
        });
        this.setNodesOnGraphModel();
        this.setEdgesOnGraphModel();
        dagre.layout(this.graphModel);
    };

    GraphModel.prototype.mapNodes = function () {
        var nodes = this.data.nodes,
            i = 0,
            len = nodes.length,
            node;
        for (; i < len; i++) {
            node = nodes[i];
            this.map.nodes[node.data.id] = node;
        }
    };

    GraphModel.prototype.mapEdges = function () {
        var i = 0,
            edges = this.data.edges,
            len = edges.length,
            edge,
            key;
        for (; i < len; i++) {
            edge = edges[i];
            key = edge.data.source + '~' + edge.data.target;
            this.map.edges[key] = edge;
        }
    };

    GraphModel.prototype.setNodesOnGraphModel = function () {
        var i = 0,
            nodes = this.data.nodes,
            len = nodes.length,
            node,
            nodeLayout = this.nodeLayout;
        for (; i < len; i++) {
            node = nodes[i];
            this.graphModel.setNode(node.data.id, {
                width: nodeLayout.width,
                height: nodeLayout.height
            });
        }
    };

    GraphModel.prototype.setEdgesOnGraphModel = function () {
        var i = 0,
            edges = this.data.edges,
            len = edges.length,
            edge;
        for (; i < len; i++) {
            edge = edges[i];
            this.graphModel.setEdge(edge.data.source, edge.data.target);
        }
    };

    GraphModel.prototype.getNodeById = function (nodeId) {
        var a = this.map.nodes[nodeId];
        var nodeLayout = this.graphModel.node(nodeId);
        return angular.extend({}, a, {
            layout: nodeLayout
        });
    };

    GraphModel.prototype.getNodeLayout = function (nodeId) {
        return this.graphModel.node(nodeId);
    };

    GraphModel.prototype.getNodeIds = function () {
        return this.graphModel.nodes();
    };

    GraphModel.prototype.getEdges = function () {
        return this.graphModel.edges();
    };

    return {
        getInstance: getInstance
    };

    function getInstance(data) {
        return new GraphModel(data);
    }
}

module.exports = mmGraphServiceFactory;
