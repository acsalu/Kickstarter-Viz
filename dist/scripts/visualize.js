"use strict";
var visualizeRidesByWeekday = function(ridesByWeekDay) {
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
  var svg = d3.select('#canvas').append('svg').attr('width', margin.left + w + margin.right).attr('height', margin.top + h + margin.bottom).append('g').attr('transform', translation(margin.left, margin.top));
  var maxValue = Math.max(d3.max(ridesByWeekday, function(d) {
    return subscriberPercentage(d.subscriber);
  }), d3.max(ridesByWeekday, function(d) {
    return customerPercentage(d.customer);
  }));
  var xScale = d3.scale.linear().domain([0, maxValue]).range([0, regionWidth]).nice();
  var xScaleLeft = d3.scale.linear().domain([0, maxValue]).range([regionWidth, 0]);
  var xScaleRight = d3.scale.linear().domain([0, maxValue]).range([0, regionWidth]);
  var yScale = d3.scale.ordinal().domain(ridesByWeekday.map(function(d) {
    return d.group;
  })).rangeRoundBands([h, 0], 0.1);
  var yAxisLeft = d3.svg.axis().scale(yScale).orient('right').tickSize(4, 0).tickPadding(margin.middle - 4);
  var yAxisRight = d3.svg.axis().scale(yScale).orient('left').tickSize(4, 0).tickFormat('');
  var xAxisRight = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(d3.format('%'));
  var xAxisLeft = d3.svg.axis().scale(xScale.copy().range([pointA, 0])).orient('bottom').tickFormat(d3.format('%'));
  var leftBarGroup = svg.append('g').attr('transform', translation(pointA, 0) + 'scale(-1,1)');
  var rightBarGroup = svg.append('g').attr('transform', translation(pointB, 0));
  svg.append('g').attr('class', 'axis y left').attr('transform', translation(pointA, 0)).call(yAxisLeft).selectAll('text').style('text-anchor', 'middle');
  svg.append('g').attr('class', 'axis y right').attr('transform', translation(pointB, 0)).call(yAxisRight);
  svg.append('g').attr('class', 'axis x left').attr('transform', translation(0, h)).call(xAxisLeft);
  svg.append('g').attr('class', 'axis x right').attr('transform', translation(pointB, h)).call(xAxisRight);
  leftBarGroup.selectAll('.bar.left').data(ridesByWeekday).enter().append('rect').attr('class', 'bar left fill-subscriber').attr('x', 0).attr('y', function(d) {
    return yScale(d.group);
  }).attr('width', function(d) {
    return xScale(subscriberPercentage(d.subscriber));
  }).attr('height', yScale.rangeBand());
  rightBarGroup.selectAll('.bar.right').data(ridesByWeekday).enter().append('rect').attr('class', 'bar right fill-customer').attr('x', 0).attr('y', function(d) {
    return yScale(d.group);
  }).attr('width', function(d) {
    return xScale(customerPercentage(d.customer));
  }).attr('height', yScale.rangeBand());
  function translation(x, y) {
    return 'translate(' + x + ',' + y + ')';
  }
};
var ridesByWeekday = [{
  group: 'Sunday',
  subscriber: 69177,
  customer: 16366
}, {
  group: 'Satuarday',
  subscriber: 79840,
  customer: 22480
}, {
  group: 'Friday',
  subscriber: 112645,
  customer: 11663
}, {
  group: 'Thursday',
  subscriber: 162917,
  customer: 13629
}, {
  group: 'Wednesday',
  subscriber: 165243,
  customer: 13176
}, {
  group: 'Tuesday',
  subscriber: 153125,
  customer: 10479
}, {
  group: 'Monday',
  subscriber: 83736,
  customer: 5445
}];
visualizeRidesByWeekday(ridesByWeekday);
