//Opens the window
$.index.open();

//
$.btnInsert.addEventListener('click',function(e){
	//Hides the keyboard in iOS
	$.tfInsert.blur();
	//if there is something in the textbox
	if($.tfInsert.value != ""){
		//This is how we are creating an instance of a model
		var listModel = Alloy.createModel("toDoList", {
			//with out custom parameters
			value: $.tfInsert.value,
			hasCheck:false
		});
		//This is how we save a model to our databaseif the model already exists, the save will be an "update".
		listModel.save();
		//Resets the model's state from the database
		Alloy.Collections.toDoList.fetch();
	}
	else{
		alert("Please fill out the text field above.");
	}
});


//Check/Uncheck
$.tbToDoList.addEventListener('click',function(e){
	//Factory method for instantiating a Backbone collection of model objects
	var recoverDatabase = Alloy.createCollection("toDoList");
	//We need the database to iterate through it
	recoverDatabase.fetch({query:"SELECT * FROM toDoList"});
	
	for(var i=0; i<recoverDatabase.length;i++){
		//This is how we are getting the value of id:toDoList .at(i).get("id_toDoList")
		if(recoverDatabase.at(i).get("id_toDoList") == e.row.rowId){
			var table = Alloy.createCollection("toDoList");
			//e.row.rowId is a custom property created in the .xml file that contains the primary key of every value in the database
			table.fetch({query:"SELECT * FROM toDoList where id_toDoList = " + e.row.rowId });
			//if the query returned with more than 0 rows
		    if(table.length > 0){
		    	//if the record(hasCheck) of the column is false
			    if(table.at(0).get("hasCheck") == false){
					e.row.hasCheck = true;
					//This is how we set a value to the database
					table.at(0).set({
						id_toDoList:e.row.rowId,
						//then we set it to true
						hasCheck:true
					}); 
					table.at(0).save();
				}
				else{
					//if not we set it to false
					e.row.hasCheck = false;
					table.at(0).set({
						id_toDoList:e.row.rowId,
						hasCheck:false
					}); 
					table.at(0).save();
				}
				//Get the latest database state
			    Alloy.Collections.toDoList.fetch();
		    }
		}
	}
});

//if we do a longpress we can delete the row
$.tbToDoList.addEventListener('longpress',function(e){
	var tableViewEvent = e.row;
	var alertDialog = Titanium.UI.createAlertDialog({
	    title: 'Remove',
	    message: 'Do you want to remove this row?',
	    buttonNames: ['Yes','No'],
	    cancel: 1
	});
	alertDialog.show();
	
 	alertDialog.addEventListener('click', function(e) {
 		
	    if (e.index == 0) { // clicked "YES"
			removeRow(tableViewEvent);
	    } else if (e.index == 1) { // clicked "NO"
	    	}    
	});	
});

function removeRow (_row) {
	var recoverDatabase = Alloy.createCollection("toDoList");

	recoverDatabase.fetch({query:"SELECT * FROM toDoList"});
	
	for(var i=0; i<recoverDatabase.length;i++){
		if(recoverDatabase.at(i).get("id_toDoList") == _row.rowId){
			var table = Alloy.createCollection("toDoList");
			table.fetch({query:"SELECT * FROM toDoList where id_toDoList = " + _row.rowId });
		    if(table.length > 0){
		    	//To remove a row from the database we use destroy()
			    table.at(0).destroy();
			    Alloy.Collections.toDoList.fetch();
		    }
		}
	}
}

//Resets the model's state from the database useful if you'd like to ensure that you have the latest database state.
Alloy.Collections.toDoList.fetch();
