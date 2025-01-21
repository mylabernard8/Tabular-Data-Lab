const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/refs/heads/master/us-weather-history/KNYC.csv";
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

