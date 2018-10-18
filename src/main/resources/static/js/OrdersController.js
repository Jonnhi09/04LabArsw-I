var order6 = {
    "order_id": 6,
    "table_id": 6,
    "products": [{
            "product": "PIZZA",
            "quantity": 3,
            "price": "$15000"
        },
        {
            "product": "HAMBURGER",
            "quantity": 1,
            "price": "12300"
        }
    ]
};

function addNewOrder() {
    var order2 = {"orderAmountsMap": {"HAMBURGER": 2, "COKE": 2}, "tableNumber": 2};
    axios.post('/orders', order2).then(function () {
                console.log("New order");
                window.location.reload();
            }).catch(function (error) {
                console.log(error);
                alert("There is a problem with our servers. We apologize for the inconvince, please try again later. Add");
            });
}

function loadOrders() {
    axios.get('/orders').then(function (response) {
    	document.getElementById("Tables").innerHTML = "";
                var orders = response.data;
                for (j in orders) {

                    //Crear tabla <table>
                    var table = document.createElement("TABLE");
                    table.border = "1";
                    //The setAttribute() method adds the specified attribute to an element, and gives it the specified value.
                    table.setAttribute("id", "Table" + j);

                    //Titulo de la tabla
                    var row = table.insertRow(-1);
                    //Crear encabezado <th>
                    var headerTable = document.createElement("TH");
                    //The colspan attribute defines the number of columns a cell should span.
                    headerTable.setAttribute("colspan", "3");
                    headerTable.innerHTML = "Table " + j;
                    row.appendChild(headerTable);

                    //Crear y agregar encabezado a las columnas
                    var header = ["Product","Quantity"];
                    var row = table.insertRow(-1);
                    var columns = 2;
                    for (var i = 0; i < columns; i++) {
                    	//Crear encabezados <th>
                        var headerCell = document.createElement("TH");
                        headerCell.innerHTML = header[i];
                        row.appendChild(headerCell);
                    }

                    //Crear filas con su respectivo contenido
                    for (var i = 0; i < Object.keys(orders[j].orderAmountsMap).length; i++) {
                        row = table.insertRow(-1);
                        var cell = row.insertCell(-1);
                        cell.innerHTML = Object.keys(orders[j].orderAmountsMap)[i];
                        var cell = row.insertCell(-1);
                        cell.innerHTML = orders[j].orderAmountsMap[Object.keys(orders[j].orderAmountsMap)[i]];
                    }

                    //Se obtiene el elemento del html
                    var tables = document.getElementById("Tables");
                    //Crear etiqueta salto de linea <br>
                    tables.appendChild(document.createElement("BR"));
                    tables.appendChild(table);
                }
            }).catch(function (error) {
                console.log(error);
                alert("There is a problem with our servers. We apologize for the inconvince, please try again later. Load");
            });
}

function removeOrderById(id) {
	axios.delete('/orders/'+id).then(function (){
		document.getElementById("Table"+id).remove();
	}).catch(function(error){
		console.log(error);
		alert("There is a problem with our servers. We apologize for the inconvince, please try again later. Remove");
	});
}
