//dependencies, mysql and inquirer npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

//credentials for creating a connection with sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "FReshcurtains91",
  database: "bamazon"
});

// method which connects to the server or throws error if errors occur
connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
});
//query which shows raw results data returned from database
/*connection.query('SELECT * FROM saleItems', function(err, res){
 if(err) throw err;
 console.log(res);
}); */

//function which displays all items and thier price, department, and inventory in the database
var viewItems = function(){
	connection.query("SELECT * FROM saleItems", function(err, results){
	if (err) throw err;

	inquirer.prompt([
	{
		name:"choice",
		type:"rawlist",
		choices: function(){
			
			for (var i=0; i<results.length;i++){
				console.log(results[i].id +"|" + results[i].product_name +"|"+results[i].department_name + "|"+results[i].price+"|"+results[i].stock);
			}
			
		},
		message:"Please enter the Id number of the item you would like to purchase: "
	},
	{
		name:"itemID",
		type: "input",
		message:"How many units would you like to purchase?: "
	}
	]).then(function(answer){
		var chosenItem;
		for (var i =0; i<results.length; i++){
		if (results[i].product_name === answer.choice){
			chosenItem= results[i];
			}
		}
	});
	});

};
viewItems();