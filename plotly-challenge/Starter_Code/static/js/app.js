// load JSON data
// data = d3.json("users.json", function(d) {
//     console.log(d)
//     return d
// });
// console.log(d);

// could not get the load JSON method to work for some reason so I created a .js file with the data as a var
// console.log(data); // confirm the data is there

var sample0 = data.samples[0]; // get the first sample as initial values
console.log(sample0);

// sort the values
var sorted0 = sample0.sample_values.sort((a, b) => b.sample_values - a.sample_values);

// get Trace0
i = 0;

// define update page function to be used with callbacks
function updatePage(i) {
    // get data
    var sample_vals = data.samples[i].sample_values.slice(0,10).reverse();
    var otu_ids = data.samples[i].otu_ids.slice(0,10).reverse();

    // define trace
    var trace0 = {
      x: sample_vals,
      y: `${otu_ids}`,
      text: "",
      name: data.samples[i].id,
      type: "bar",
      orientation: "h"
    };

    // data
    var barData = [trace0];

    // Apply the group bar mode to the layout
    var layout = {
      title: `10 largest sample for OTU ID: ${data.samples[i].id}`,
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    // update plot
    Plotly.newPlot("bar", barData, layout);
}

var n = 0;
// Define dropdown function changed
function optionChanged(value) {
    var indOfID = window.data.names.findIndex(element => element === value); // use arrow fun to find index of list value
    var demoData = window.data.metadata[indOfID];  // using window.var as a prepend to access data as a global variable
    console.log(demoData); // debug log

    // update bardata
    updatePage(indOfID);

    // update demographic info
    // select html
    var selection = d3.select("#sample-metadata");
    selection.html("");

    // iterate through data and add to Demographic info
    Object.entries(demoData).forEach(([key, val]) => {
        // n = n + 1;
        // console.log(n)
        // console.log(demoData)
        // console.log(`${key}: ${val}`);
        selection.append("h6").text(`${key}: ${val}`);
    });
};


// populate the drop down menu with all names using d3
d3.select("#selDataset").selectAll("option")
  .data(data.names)
  .enter() // creates placeholder for new data
  .append("option") // appends a div to placeholder
  // .classed("col-md-4 thumbnail", true) // sets the class of the new div
  .html(function(d) {
    return `<option value="ID_${d}">${d}</option>`;
  });

updatePage(1);