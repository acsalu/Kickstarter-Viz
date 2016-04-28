"use strict";
var pieWidth = 400,
    pieHeight = 200,
    radius = Math.min(pieWidth, pieHeight) / 2;
var arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(0);
var labelArc = d3.svg.arc().outerRadius(radius - 40).innerRadius(radius - 40);
var pie = d3.layout.pie().sort(null).value(function(d) {
  return d.total;
});
var svg = d3.select("#canvas-pie").append("svg").attr("width", pieWidth).attr("height", pieHeight).append("g").attr("transform", "translate(" + (pieWidth / 2 - 22) + "," + pieHeight / 2 + ")");
var pieData = null;
var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
var updatePieChart = function(year, month) {
  console.log('update pie' + year + month);
  var data = pieData.filter(function(d) {
    return (d.month == month);
  });
  console.log(data);
  var g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");
  g.append("path").attr("d", arc).attr("class", function(d) {
    console.log(d);
    return "arc " + (d.data.usertype == "Customer" ? "fill-customer" : "fill-subscriber");
  }).on("mouseover", function(d) {
    tooltip.transition().duration(200).style("opacity", 1.0);
    tooltip.html(pie(d.data)).style("left", (d3.event.pageX - 60) + "px").style("top", (d3.event.pageY - 28) + "px");
  }).on("mouseout", function(d) {
    tooltip.transition().duration(500).style("opacity", 0);
  });
  g.append("text").attr("transform", function(d) {
    return "translate(" + labelArc.centroid(d) + ")";
  }).attr("dy", ".35em").text(function(d) {
    return d.data.usertype;
  });
};
d3.csv("dist/data/pie.csv", function(error, data) {
  if (error) {
    throw error;
  }
  data.forEach(function(d) {
    d.total = +d.total;
    d.month = +d.month;
    d.year = +d.yeaer;
  });
  pieData = data;
  updatePieChart(2015, 10);
});
