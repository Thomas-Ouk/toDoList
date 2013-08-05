exports.definition = {
    config : {
        columns : {
            "id_toDoList": "INTEGER PRIMARY KEY AUTOINCREMENT",
            "value" : "TEXT",
            "hasCheck": "BOOLEAN"
        },
        adapter : {
            type : "sql",
            collection_name : "toDoList",
            idAttribute: "id_toDoList",
        }
    }

}