"use strict";
var visualizeAvgDurationByWeekday = function(avgDurationByWeekday) {
  var w = 500,
      h = 200;
  var margin = {
    top: 20,
    right: 20,
    bottom: 24,
    left: 20,
    middle: 24
  };
  var regionWidth = w / 2 - margin.middle;
  var pointA = regionWidth,
      pointB = w - regionWidth;
  var subscriberTotal = d3.sum(ridesByWeekday, function(d) {
    return d.subscriber;
  }),
      subscriberPercentage = function(d) {
        return d / subscriberTotal;
      };
  var customerTotal = d3.sum(ridesByWeekday, function(d) {
    return d.customer;
  }),
      customerPercentage = function(d) {
        return d / customerTotal;
      };
  var svg = d3.select('#canvas-avg-duration').append('svg').attr('width', margin.left + w + margin.right).attr('height', margin.top + h + margin.bottom).append('g').attr('transform', translation(margin.left, margin.top));
  var maxValue = Math.max(d3.max(avgDurationByWeekday, function(d) {
    return d.subscriber;
  }), d3.max(avgDurationByWeekday, function(d) {
    return d.customer;
  }));
  var xScale = d3.scale.linear().domain([0, maxValue]).range([0, regionWidth]).nice();
  var xScaleLeft = d3.scale.linear().domain([0, maxValue]).range([regionWidth, 0]);
  var xScaleRight = d3.scale.linear().domain([0, maxValue]).range([0, regionWidth]);
  var yScale = d3.scale.ordinal().domain(avgDurationByWeekday.map(function(d) {
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
  leftBarGroup.selectAll('.bar.left').data(avgDurationByWeekday).enter().append('rect').attr('class', 'bar left fill-subscriber').attr('x', 0).attr('y', function(d) {
    return yScale(d.group);
  }).attr('width', function(d) {
    return xScale(d.subscriber);
  }).attr('height', yScale.rangeBand());
  rightBarGroup.selectAll('.bar.right').data(avgDurationByWeekday).enter().append('rect').attr('class', 'bar right fill-customer').attr('x', 0).attr('y', function(d) {
    return yScale(d.group);
  }).attr('width', function(d) {
    return xScale(d.customer);
  }).attr('height', yScale.rangeBand());
  function translation(x, y) {
    return 'translate(' + x + ',' + y + ')';
  }
};
var avgDurationByWeekday = [{
  group: 'Sunday',
  subscriber: 14.1332087736,
  customer: 45.7029654976
}, {
  group: 'Satuarday',
  subscriber: 15.7063869405,
  customer: 41.4289842823
}, {
  group: 'Friday',
  subscriber: 14.4531406927,
  customer: 41.3228900512
}, {
  group: 'Thursday',
  subscriber: 13.9791183036,
  customer: 44.3175679311
}, {
  group: 'Wednesday',
  subscriber: 14.2578966532,
  customer: 45.6563347501
}, {
  group: 'Tuesday',
  subscriber: 13.6142680816,
  customer: 37.1350176544
}, {
  group: 'Monday',
  subscriber: 13.0568393522,
  customer: 38.245610652
}];
visualizeAvgDurationByWeekday(avgDurationByWeekday);
