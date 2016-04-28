"use strict";
var pieWidth = 400,
    pieHeight = 200,
    radius = Math.min(pieWidth, pieHeight) / 2;
var color = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
var arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(0);
var labelArc = d3.svg.arc().outerRadius(radius - 40).innerRadius(radius - 40);
var pie = d3.layout.pie().sort(null).value(function(d) {
  return d.total;
});
var svg = d3.select("#canvas-pie").append("svg").attr("width", pieWidth).attr("height", pieHeight).append("g").attr("transform", "translate(" + pieWidth / 2 + "," + pieHeight / 2 + ")");
var pieData = null;
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
