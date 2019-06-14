/* Copyright (c) 2012-2013 Casewise Systems Ltd (UK) - All rights reserved */
/*global cwAPI, jQuery*/

(function(cwApi, $) {
    "use strict";

    var cwFilterByContextualAssociation = function(options, viewSchema) {
        this.replaceLayout = options.CustomOptions['replace-layout'];
        cwApi.extend(this, cwApi.cwLayouts[this.replaceLayout], options, viewSchema);

        this.trueNodesID = {};
        this.falseNodesID = {};
        this.createObjectNodes(true, this.options.CustomOptions["filter-in"]);
        this.createObjectNodes(false, this.options.CustomOptions["filter-out"]);
        this.replaceLayout = this.options.CustomOptions["replace-layout"];
        this.topObject = this.options.CustomOptions["top-object"];

        cwApi.registerLayoutForJSActions(this);
    };

    cwFilterByContextualAssociation.prototype.drawAssociations = function(output, associationTitleText, object) {
        function getUrlParam(name, url) {
            if (!url) url = location.href;
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(url);
            return results == null ? null : results[1];
        }

        if (this.topObject) {
            let father = {};
            father.object_id = parseInt(getUrlParam("cwid"), 10);
            this.findFilterNode(object, father, null);
        } else {
            this.findFilterNode(object, null, null);
        }

        if (cwApi.cwLayouts[this.replaceLayout].prototype.drawAssociations) {
            cwApi.cwLayouts[this.replaceLayout].prototype.drawAssociations.call(this, output, associationTitleText, object);
        } else {
            cwApi.cwLayouts.CwLayout.prototype.drawAssociations.call(this, output, associationTitleText, object);
        }
    };

    cwFilterByContextualAssociation.prototype.createObjectNodes = function(nodeType, customOptions) {
        var nodes = customOptions.split(";");
        for (var i = 0; i < nodes.length; i += 1) {
            if (nodeType === true) {
                this.trueNodesID[nodes[i]] = nodes[i];
            } else if (nodeType === false) {
                this.falseNodesID[nodes[i]] = nodes[i];
            }
        }
    };

    cwFilterByContextualAssociation.prototype.findFilterNode = function(child, topfather) {
        var nextChild = null;
        var i;
        var nodeToDelete;
        var objectToUseAsContextualFilter;
        for (var associationNode in child.associations) {
            if (child.associations.hasOwnProperty(associationNode)) {
                nodeToDelete = [];
                for (i = 0; i < child.associations[associationNode].length; i += 1) {
                    let nextChild = child.associations[associationNode][i];
                    if (this.trueNodesID.hasOwnProperty(associationNode) && topfather && nextChild.object_id === topfather.object_id) {
                        return true;
                    } else if (this.falseNodesID.hasOwnProperty(associationNode) && topfather && nextChild.object_id === topfather.object_id) {
                        return false;
                    } else {
                        if(topfather === null) objectToUseAsContextualFilter = nextChild ;
                        else objectToUseAsContextualFilter = topfather; 

                        if (!this.findFilterNode(nextChild, objectToUseAsContextualFilter) ) {
                            nodeToDelete.push(i);
                        }
                    }
                }
                if (this.trueNodesID.hasOwnProperty(associationNode)) {
                    return false;
                }
                if (this.falseNodesID.hasOwnProperty(associationNode)) {
                    return true;
                }
                for (i = nodeToDelete.length - 1; i >= 0; i -= 1) {
                    delete child.associations[associationNode].splice(nodeToDelete[i], 1);
                }
            }
        }


        return true;
    };

    cwApi.cwLayouts.cwFilterByContextualAssociation = cwFilterByContextualAssociation;
})(cwAPI, jQuery);
