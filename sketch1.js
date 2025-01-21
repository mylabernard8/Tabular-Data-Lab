const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/refs/heads/master/us-weather-history/KNYC.csv";
let weatherTable; //variable for the weather data

function preload() {
  weatherTable = loadTable(weatherURL, 'csv', 'header');
}

function setup() {
  createCanvas(800, 400); 
  noLoop();
}

function draw() {
  background(220); //make gray for professional feel

  // get mean temperatures
  let meanTemps = [];
  for (let i = 0; i < weatherTable.getRowCount(); i++) {
    meanTemps.push(weatherTable.getNum(i, "actual_mean_temp"));
  }

//draw the x and y axis
  stroke(0);
  line(50, height - 50, width - 50, height - 50); // X-axis
  line(50, 50, 50, height - 50); // Y-axis

  // labels for axises (mean temp and day)
  textAlign(CENTER, CENTER);
  text("day of year", width / 2, height - 20); // Label for X-axis
  text("mean temperature (F)", 20, height / 2, 50, 100); // Label for Y-axis

  // scale the data
  let xStep = (width - 100) / meanTemps.length; 
  let yMax = max(meanTemps);
  let yMin = min(meanTemps);

  // line graph
  stroke(0, 0, 255); // blue for color to make pop 
  noFill();
  beginShape();
  for (let i = 0; i < meanTemps.length; i++) {
    let x = 50 + i * xStep;
    let y = map(meanTemps[i], yMin, yMax, height - 50, 50); 
    vertex(x, y);
  }
  endShape();
}
