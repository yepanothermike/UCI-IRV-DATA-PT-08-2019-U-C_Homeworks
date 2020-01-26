// define svg params
var svgWidth = 800;
var svgHeight = 600;
var circleRadius = 15;

var margin = {
  top: 25,
  right: 25,
  bottom: 100,
  left: 75
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// create the svg
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// set initial chart x-axis title
var xAxis = "In Poverty (%)";

// ----------------------------
// Define helper functions
// ----------------------------

// function for updating x-scale on click of x-label
function xScale(data, xAxis) {
    // create scales
    var xScale = d3.scaleLinear()
        .domain([d3.min(data, d=> d[xAxis]) * 0.8,
            d3.max(hairData, d => d[xAxis]) * 1.2
        ])
        .range([0, width]);

    return xScale;
}

// function for updating x-variable on click of x-label
function renderAxes(newX, xAxis) {
    var bottomAxis = d3.axisBottom(newX);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis
}

// Load data
d3.csv("assets/data/data.csv").then(function(plotData) {
    console.log(plotData);
    // Parse data and convert to numeric values
    plotData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        data.income = +data.income;
        data.smokes = +data.smokes;
        data.obesity = +data.obesity;
    });

    // create scales
    var xScale = d3.scaleLinear()
        .domain([d3.min(plotData, d => d.poverty), d3.max(plotData, d => d.poverty)])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([d3.min(plotData, d => d.healthcare), d3.max(plotData, d => d.healthcare)])
        .range([height, 0]);

    // create axis
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // append axis to the chart group
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    // add circles at data points
    var circlesGroup = chartGroup.selectAll("circle")
        .data(plotData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", circleRadius)
        .attr("fill", "blue")
        .attr("opacity", "0.8");

    // add text
    var textGroup = chartGroup.selectAll("text")
        .data(plotData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("dx", d => xScale(d.poverty) - circleRadius * 0.75)
        .attr("dy", d => yScale(d.healthcare) + circleRadius * 0.3)
        .attr("font-size", circleRadius)
        .attr("fill", "white");

    // add tooltip
    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) {
            return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}<br>Income: $ ${d.income}`);
        });

    chartGroup.call(toolTip);

    // create event listeners
    // on click
    circlesGroup
        .on("mouseover", function(data) {
        toolTip.show(data, this);
        d3.select(this)
            .style("opacity", 0.5)
    })
    // on mouseout
    .on("mouseout", function(data, index) {
        toolTip.hide(data);
        d3.select(this)
            .style("opacity", 1)
    });

    // create axis labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 45)
        .attr("x", 0 - (height / 2))
        .attr("dy", "lem")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
  }).catch(function(error) {
    console.log(error);
  });

