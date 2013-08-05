exports.definition = {
    config: {
        columns: {
            id_toDoList: "INTEGER PRIMARY KEY AUTOINCREMENT",
            value: "TEXT",
            hasCheck: "BOOLEAN"
        },
        adapter: {
            type: "sql",
            collection_name: "toDoList",
            idAttribute: "id_toDoList"
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("toDoList", exports.definition, []);

collection = Alloy.C("toDoList", exports.definition, model);

exports.Model = model;

exports.Collection = collection;