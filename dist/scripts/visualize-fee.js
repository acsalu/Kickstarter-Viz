"use strict";
var visualizeAdditionalFee = function(additionalFee) {
  var w = 800,
      h = 34;
  var margin = {
    top: 20,
    right: 20,
    bottom: 24,
    left: 20,
    middle: 36
  };
  var regionWidth = w / 2 - margin.middle;
  var pointA = regionWidth,
      pointB = w - regionWidth;
  var svg = d3.select('#canvas-additiona-fee').append('svg').attr('width', margin.left + w + margin.right).attr('height', margin.top + h + margin.bottom).append('g').attr('transform', translation(margin.left, margin.top));
  var maxValue = Math.max(d3.max(additionalFee, function(d) {
    return d.subscriber;
  }), d3.max(additionalFee, function(d) {
    return d.customer;
  }));
  var xScale = d3.scale.linear().domain([0, maxValue]).range([0, regionWidth]).nice();
  var xScaleLeft = d3.scale.linear().domain([0, maxValue]).range([regionWidth, 0]);
  var xScaleRight = d3.scale.linear().domain([0, maxValue]).range([0, regionWidth]);
  var yScale = d3.scale.ordinal().domain(additionalFee.map(function(d) {
    return d.group;
  })).rangeRoundBands([h, 0], 0.1);
  var yAxisLeft = d3.svg.axis().scale(yScale).orient('right').tickSize(4, 0).tickPadding(margin.middle - 4);
  var yAxisRight = d3.svg.axis().scale(yScale).orient('left').tickSize(4, 0).tickFormat('');
  var xAxisRight = d3.svg.axis().scale(xScale).orient('bottom');
  var xAxisLeft = d3.svg.axis().scale(xScale.copy().range([pointA, 0])).orient('bottom');
  var leftBarGroup = svg.append('g').attr('transform', translation(pointA, 0) + 'scale(-1,1)');
  var rightBarGroup = svg.append('g').attr('transform', translation(pointB, 0));
  svg.append('g').attr('class', 'axis y left').attr('transform', translation(pointA, 0)).call(yAxisLeft).selectAll('text').style('text-anchor', 'middle');
  svg.append('g').attr('class', 'axis y right').attr('transform', translation(pointB, 0)).call(yAxisRight);
  svg.append('g').attr('class', 'axis x left').attr('transform', translation(0, h)).call(xAxisLeft);
  svg.append('g').attr('class', 'axis x right').attr('transform', translation(pointB, h)).call(xAxisRight);
  var tooltip = d3.select(".tooltip").style("opacity", 0);
  leftBarGroup.selectAll('.bar.left').data(additionalFee).enter().append('rect').attr('class', 'bar left fill-subscriber').attr('x', 0).attr('y', function(d) {
    return yScale(d.group);
  }).attr('width', function(d) {
    return xScale(d.subscriber);
  }).attr('height', yScale.rangeBand()).on("mouseover", function(d) {
    tooltip.transition().duration(200).style("opacity", 1.0);
    tooltip.html("$" + d.subscriber.toFixed(2)).style("left", (d3.event.pageX - 60) + "px").style("top", (d3.event.pageY - 28) + "px");
  }).on("mouseout", function(d) {
    tooltip.transition().duration(500).style("opacity", 0);
  });
  rightBarGroup.selectAll('.bar.right').data(additionalFee).enter().append('rect').attr('class', 'bar right fill-customer').attr('x', 0).attr('y', function(d) {
    return yScale(d.group);
  }).attr('width', function(d) {
    return xScale(d.customer);
  }).attr('height', yScale.rangeBand()).on("mouseover", function(d) {
    tooltip.transition().duration(200).style("opacity", 1.0);
    tooltip.html("$" + d.customer.toFixed(2)).style("left", (d3.event.pageX + 5) + "px").style("top", (d3.event.pageY - 28) + "px");
  }).on("mouseout", function(d) {
    tooltip.transition().duration(500).style("opacity", 0);
  });
  function translation(x, y) {
    return 'translate(' + x + ',' + y + ')';
  }
};
var additionalFee = [{
  group: 'Total',
  subscriber: 0.652313628309,
  customer: 8.92687342833
}];
visualizeAdditionalFee(additionalFee);
