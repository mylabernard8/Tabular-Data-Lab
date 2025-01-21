const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/master/us-weather-history/KNYC.csv";
let weatherTable;
let currentSubset = "January";

const subsets = {
  "January": { start: 0, end: 30 },
  "February": { start: 31, end: 59 },
  "March": { start: 60, end: 90 },
};

function preload() {
  weatherTable = loadTable(weatherURL, 'csv', 'header'); // Load data
}

function setup() {
  createCanvas(800, 400);
  noLoop();
}

function draw() {
  background(220);
  textSize(12);
  textAlign(CENTER, CENTER);

  const points = extractAndScaleData();

  // Draw axes
  stroke(0);
  line(50, height - 50, width - 50, height - 50); // X-axis
  line(50, 50, 50, height - 50); // Y-axis

  // Add labels
  text(`${currentSubset} Temperatures`, width / 2, 20);
  text("Day", width / 2, height - 20);
  text("Mean Temp (°F)", 20, height / 2, 50, 100);

  // Draw line graph
  stroke(255, 0, 0);
  noFill();
  beginShape();
  for (let point of points) {
    vertex(point.x, point.y);
  }
  endShape();
}

function extractAndScaleData() {
  let subset = subsets[currentSubset];
  let meanTemps = [];
  for (let i = subset.start; i <= subset.end; i++) {
    meanTemps.push(weatherTable.getNum(i, "actual_mean_temp"));
  }

  const xStep = (width - 100) / meanTemps.length;
  const yMax = max(meanTemps);
  const yMin = min(meanTemps);

  let scaledPoints = [];
  for (let i = 0; i < meanTemps.length; i++) {
    const x = 50 + i * xStep;
    const y = map(meanTemps[i], yMin, yMax, height - 50, 50);
    scaledPoints.push({ x, y });
  }
  return scaledPoints;
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    // Cycle through subsets
    let keys = Object.keys(subsets);
    let currentIndex = keys.indexOf(currentSubset);
    currentSubset = keys[(currentIndex + 1) % keys.length];
    redraw(); // Redraw the graph
  }
}
