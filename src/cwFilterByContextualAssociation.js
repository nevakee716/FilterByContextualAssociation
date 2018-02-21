/* Copyright (c) 2012-2013 Casewise Systems Ltd (UK) - All rights reserved */
/*global cwAPI, jQuery*/

(function(cwApi, $) {
    'use strict';

    var cwFilterByContextualAssociation = function(options, viewSchema) {

        cwApi.extend(this, cwApi.cwLayouts.CwLayout, options, viewSchema);
        this.trueNodesID = {};
        this.falseNodesID = {};
        this.createObjectNodes(true,this.options.CustomOptions['filter-in']);
        this.createObjectNodes(false,this.options.CustomOptions['filter-out']);
        this.replaceLayout = this.options.CustomOptions['replace-layout'];
        this.topObject = this.options.CustomOptions['top-object'];
        cwApi.extend(this, cwApi.cwLayouts[this.replaceLayout], options, viewSchema);
        cwApi.registerLayoutForJSActions(this);
    };

    cwFilterByContextualAssociation.prototype.drawOneMethod = function(output, child) {
    	if(this.topObject) {
    		debugger;
    		this.findFilterNode(child,this.item,null);
    	} else {
    		this.findFilterNode(child,child,null);
    	}
        
        if(cwApi.cwLayouts[this.replaceLayout].drawOneMethod) {
            cwApi.cwLayouts[this.replaceLayout].drawOneMethod.call(this, output, child);
        } else if(cwApi.cwLayouts[this.replaceLayout].drawOne) {
            cwApi.cwLayouts[this.replaceLayout].drawOne.call(this, output, child);
        }
    };

    cwFilterByContextualAssociation.prototype.createObjectNodes = function(nodeType,customOptions) {
        var nodes = customOptions.split(";");
        for (var i = 0; i < nodes.length; i += 1) {
            if(nodeType === true) {
                this.trueNodesID[nodes[i]] = nodes[i];
            } else if(nodeType === false){
                this.falseNodesID[nodes[i]] = nodes[i];
            }
        }
    };


    cwFilterByContextualAssociation.prototype.findFilterNode = function(child,topfather) {
        var nextChild = null;
        var i;
        var nodeToDelete;

        for (var associationNode in child.associations) {
            if (child.associations.hasOwnProperty(associationNode)) {
                nodeToDelete = [];
                for (i = 0; i < child.associations[associationNode].length; i += 1) {
                    if(this.trueNodesID.hasOwnProperty(associationNode) && child.associations[associationNode][i].name === topfather.name) {
                        return true;
                    } else if(this.falseNodesID.hasOwnProperty(associationNode) && child.associations[associationNode][i].name === topfather.name) {
                        return false;
                    } else {
                        nextChild = child.associations[associationNode][i];
                        if(!this.findFilterNode(nextChild,topfather)) {
                            nodeToDelete.push(i);
                        }
                    }
                }
                if(this.trueNodesID.hasOwnProperty(associationNode)) {
                    return false;
                }
                if(this.falseNodesID.hasOwnProperty(associationNode)) {
                    return true;
                }
                for (i = nodeToDelete.length-1; i >= 0; i -= 1) {
                    delete child.associations[associationNode].splice(nodeToDelete[i], 1);
                }
            }
        }

        for (var iAssociationNode in child.iAssociations) {
            if (child.iAssociations.hasOwnProperty(iAssociationNode)) {
                nodeToDelete = [];
                for (i = 0; i < child.iAssociations[iAssociationNode].length; i += 1) {
                    if(this.trueNodesID.hasOwnProperty(iAssociationNode) && child.iAssociations[iAssociationNode][i].name === topfather.name) {
                        return true;
                    } else if(this.falseNodesID.hasOwnProperty(iAssociationNode) && child.iAssociations[iAssociationNode][i].name === topfather.name) {
                        return false;
                    } else {
                        nextChild = child.iAssociations[iAssociationNode][i];
                        if(!this.findFilterNode(nextChild,topfather)) {
                            nodeToDelete.push(i);
                        }
                    }
                }
                if(this.trueNodesID.hasOwnProperty(iAssociationNode)) {
                    return false;
                }
                if(this.falseNodesID.hasOwnProperty(iAssociationNode)) {
                    return true;
                }
                for (i = nodeToDelete.length-1; i >= 0; i -= 1) {
                    delete child.iAssociations[iAssociationNode].splice(nodeToDelete[i], 1);
                }
            }
        }
        return true;
    };


    cwApi.cwLayouts.cwFilterByContextualAssociation = cwFilterByContextualAssociation;

    }(cwAPI, jQuery));