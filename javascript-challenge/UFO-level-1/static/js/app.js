// from data.js
var tableData = data;

// select table body
var tableBody = d3.select("tbody");

// load the unfiltered data using an array function
data.forEach((alienReport) => {
  var row = tableBody.append("tr");
  Object.entries(alienReport).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
  });
});


// Select the button
var button = d3.select("#filter-btn");


// filter the data table from user input and refresh the html
button.on("click", function() {
  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  console.log(inputValue);

});
