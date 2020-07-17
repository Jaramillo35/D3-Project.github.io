let svgWidth = 960;
let svgHeight = 500;

let svg = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

let margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
}

let chartWidth = svgWidth - margin.right - margin.left;
let chartHeight = svgHeight - margin.top - margin.bottom;
let chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)



d3.csv("assets/data/data.csv").then(function (data) {

    console.log(data)
    data.forEach(d => console.log("smokes", typeof (d.smokes)))

    data.forEach(function (d) {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
    });
    data.forEach(d => console.log("poverty", d.poverty))
    console.log(([d3.max(data, d => d.poverty)]))
    console.log(([d3.min(data, d => d.poverty)]))

    let yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.healthcare), d3.max(data, d => d.healthcare)])
        .range([chartHeight, 0]);

    let xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.poverty), d3.max(data, d => d.poverty)])
        .range([0, chartWidth]);

    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis)

    chartGroup.append("g")
        .classed("axis", true)
        .attr("transform", `translate(0,${chartHeight})`)
        .call(bottomAxis)


    let circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .text(d => d.abbr)
        .attr("r", "8")
        .attr("fill", "cornflowerblue")
        .attr("stroke-width", "1")
        .attr("stroke", "black");



    data.forEach(function (d) {
        chartGroup.append("g")
        .append("text")
        .text(d.abbr)
        .attr("transform", `translate(${xLinearScale(d.poverty)-7},${yLinearScale(d.healthcare)+3})`)
        .attr("style","color: cornsilk; font-size: 9px ")
    })

    chartGroup.append("g")
        .append("text")
        .attr("y", 1)
        .attr("dy", "1em")
        .attr("transform", "rotate(-90) translate(-250,-50)")
        .text("Lacks Healthcare (%)");

    chartGroup.append("g")
        .append("text")
        .attr("x", 1)
        .attr("dx", "1em")
        .attr("transform", `translate(370,${chartWidth / 2})`)
        .text("In Poverty (%)");

})