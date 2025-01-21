const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/refs/heads/master/us-weather-history/KNYC.csv";
let weatherTable;

function preload() {
  weatherTable = loadTable(weatherURL, 'csv', 'header');
}

function setup() {
  createCanvas(800, 400);
  noLoop();
}

