var totalCount = dataOrig.length,
  combinators = ['carat','price','depth'],
  dataSetproperty = 'cut',
  width = 500,
  height = 250;


//truncate the original data to a reduced state.
data = dataOrig.slice(0,totalCount);
// create a new fusion chart instance with the given configuration(config).
function createInstance(config) {
  return new FusionCharts(config);
}
//renders the chart refered by the instance.
function renderChart() {
  var chart = this;
  chart.render();
}
function generateChildDOM(parentID, type) {
  var parentElem = document.getElementById(parentID),
      type = type || "div"; 
  return function (id) {
    var elem;
    elem = document.createElement(type);
    elem.id = id;
    elem.innerHTML = "Scatter Plot Matrices will render here";
    parentElem.appendChild(elem);

    return id;
  };
}
function createScatterMatrix(combinators, dataSetproperty) {
  var i,
    matrix = [],
    row,
    xAxisName,
    yAxisName,
    dimension = combinators.length,
    parentContainer = "chartContainer";
  //sets the child generator to generate child of the chartContainer as div elements
  generateChildDOM = generateChildDOM(parentContainer, "span");
  for (i = 0; i < dimension; i += 1) {
      row = (matrix[i] = []);
      xAxisName = combinators[i];
      for (j = 0; j < dimension; j += 1) {
        //draw a scatter chart
        if ( i !== j) {
          yAxisName = combinators[j];
          row[j] = createInstance({
             type: 'zoomscatter',
             renderAt: generateChildDOM((parentContainer + "_" + xAxisName + "_" + yAxisName)),
             width: width,
             height: height,
             dataFormat: 'json',
             dataSource: generateJSON(xAxisName, yAxisName, dataSetproperty)
          });
          console.log(generateJSON(xAxisName, yAxisName, dataSetproperty))
          renderChart.call(row[j]);
        }
        //else draw a drawing pad
        else {
        }
      }
    }
    //retruns the entire matrix of the different instances of fusion charts class.
    return matrix;    
}
//takes the properties as parameters and generate the entire json to be used for Fusion charts object.
function generateJSON(xAxis, yAxis, dataSetType) {
    var dataSet = {},
      json = {
        "chart": {
          "xAxisName": xAxis,
          "yAxisName": yAxis,
          "showLegend": "1",
          "showBorder": "0",
          "bgcolor": "#ffffff",
          "canvasBgColor": "#ffffff",
          "showAxisLines": "1",
          "yAxisNameFontBold": "0",
          "xAxisNameFontBold": "0"
        },
        "dataset": [] 
      },
      len = data.length,
      type,
      temp,
      unit;
    for (i = 0; i < len; i += 1){
      //extract an element from the given array.
      unit = data[i];
      type = unit[dataSetType];
      temp = dataSet[type] || (dataSet[type] = {});
      temp.seriesname || (temp["seriesname"] = type);
      temp.data || (temp.data = []);
      temp.data.push({
        x: unit[xAxis],
        y: unit[yAxis]
        //todo: set level tooltext.
      });
    }
    //modify to the required dataset structure.
    for (i in dataSet) {
      json.dataset.push(dataSet[i]);
    }
  return json;
}
createScatterMatrix(combinators, dataSetproperty);