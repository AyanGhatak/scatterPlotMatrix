FusionCharts.ready(function() {
  var selectivityChart = new FusionCharts({
    type: 'zoomscatter',
    renderAt: 'chartContainer',
    width: 600,
    height: 400,
    dataFormat: 'jsonurl',
    dataSource: "./js/data.json"
  });
  selectivityChart.render();
});