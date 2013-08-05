function Controller() {
    function __alloyId9() {
        var models = __alloyId8.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId4 = models[i];
            __alloyId4.__transform = {};
            var __alloyId5 = Ti.UI.createTableViewRow({
                hasCheck: "undefined" != typeof __alloyId4.__transform["hasCheck"] ? __alloyId4.__transform["hasCheck"] : __alloyId4.get("hasCheck"),
                width: Ti.UI.FILL,
                height: "40dp",
                rowId: "undefined" != typeof __alloyId4.__transform["id_toDoList"] ? __alloyId4.__transform["id_toDoList"] : __alloyId4.get("id_toDoList")
            });
            rows.push(__alloyId5);
            var __alloyId6 = Ti.UI.createView({
                width: "90%",
                height: Ti.UI.FILL,
                left: "10dp"
            });
            __alloyId5.add(__alloyId6);
            var __alloyId7 = Ti.UI.createLabel({
                left: 0,
                color: "black",
                font: {
                    fontFamily: "HelveticaNeue",
                    fontSize: "12sp"
                },
                text: "undefined" != typeof __alloyId4.__transform["value"] ? __alloyId4.__transform["value"] : __alloyId4.get("value")
            });
            __alloyId6.add(__alloyId7);
        }
        $.__views.tbToDoList.setData(rows);
    }
    function removeRow(_row) {
        var recoverDatabase = Alloy.createCollection("toDoList");
        recoverDatabase.fetch({
            query: "SELECT * FROM toDoList"
        });
        for (var i = 0; recoverDatabase.length > i; i++) if (recoverDatabase.at(i).get("id_toDoList") == _row.rowId) {
            var table = Alloy.createCollection("toDoList");
            table.fetch({
                query: "SELECT * FROM toDoList where id_toDoList = " + _row.rowId
            });
            if (table.length > 0) {
                table.at(0).destroy();
                Alloy.Collections.toDoList.fetch();
            }
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("toDoList");
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.tfInsert = Ti.UI.createTextField({
        width: "290dp",
        height: "40dp",
        top: "10dp",
        left: "15dp",
        borderRadius: "6dp",
        borderColor: "black",
        borderWidth: "1dp",
        maxLength: "80dp",
        paddingLeft: "10dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        clearOnEdit: true,
        id: "tfInsert"
    });
    $.__views.index.add($.__views.tfInsert);
    $.__views.btnInsert = Ti.UI.createButton({
        right: "15dp",
        top: "60dp",
        width: "60dp",
        height: "30dp",
        title: "Insert",
        id: "btnInsert"
    });
    $.__views.index.add($.__views.btnInsert);
    $.__views.tbToDoList = Ti.UI.createTableView({
        widht: Ti.UI.FILL,
        height: Ti.UI.FILL,
        top: "100dp",
        id: "tbToDoList"
    });
    $.__views.index.add($.__views.tbToDoList);
    var __alloyId8 = Alloy.Collections["toDoList"] || toDoList;
    __alloyId8.on("fetch destroy change add remove reset", __alloyId9);
    exports.destroy = function() {
        __alloyId8.off("fetch destroy change add remove reset", __alloyId9);
    };
    _.extend($, $.__views);
    $.index.open();
    $.btnInsert.addEventListener("click", function() {
        $.tfInsert.blur();
        if ("" != $.tfInsert.value) {
            var listModel = Alloy.createModel("toDoList", {
                value: $.tfInsert.value,
                hasCheck: false
            });
            listModel.save();
            Alloy.Collections.toDoList.fetch();
        } else alert("Please fill out the text field above.");
    });
    $.tbToDoList.addEventListener("click", function(e) {
        var recoverDatabase = Alloy.createCollection("toDoList");
        recoverDatabase.fetch({
            query: "SELECT * FROM toDoList"
        });
        for (var i = 0; recoverDatabase.length > i; i++) if (recoverDatabase.at(i).get("id_toDoList") == e.row.rowId) {
            var table = Alloy.createCollection("toDoList");
            table.fetch({
                query: "SELECT * FROM toDoList where id_toDoList = " + e.row.rowId
            });
            if (table.length > 0) {
                if (false == table.at(0).get("hasCheck")) {
                    e.row.hasCheck = true;
                    table.at(0).set({
                        id_toDoList: e.row.rowId,
                        hasCheck: true
                    });
                    table.at(0).save();
                } else {
                    e.row.hasCheck = false;
                    table.at(0).set({
                        id_toDoList: e.row.rowId,
                        hasCheck: false
                    });
                    table.at(0).save();
                }
                Alloy.Collections.toDoList.fetch();
            }
        }
    });
    $.tbToDoList.addEventListener("longpress", function(e) {
        var tableViewEvent = e.row;
        var alertDialog = Titanium.UI.createAlertDialog({
            title: "Remove",
            message: "Do you want to remove this row?",
            buttonNames: [ "Yes", "No" ],
            cancel: 1
        });
        alertDialog.show();
        alertDialog.addEventListener("click", function(e) {
            0 == e.index ? removeRow(tableViewEvent) : 1 == e.index;
        });
    });
    Alloy.Collections.toDoList.fetch();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;