let yearStart = 2009;
let margin = 10;
let moneyMin = 3000;
let moneyMax = 7000;
let moneyMargin = 500;
let yRes = 1000;

let numCols;
let colSpacing;

// row [0] has lecturer,

let grid = new Graph();
let lecturer;

function preload() {
  var url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQjYzVuDqKpxr5kUfyH1dIwUwLLpBrTyPsxHdhwNEEi7Yz93LUgm-ADXnSFn9GemwJLhaKVMW_xep5O/pub?gid=0&single=true&output=csv";
  table = loadTable(url, "csv", "header");
}

function setup() {
  createCanvas(1000, 800);

  margin = width / margin;

  numCols = 2025 - yearStart;
  colSpacing = (width - margin * 2) / numCols;
  lecturer = new Plot(0);
  // console.log(lecturer.data);
}

function handleLecturer(cb) {
  lecturer = cb.checked;
}

function handlePrez(cb) {
  prez = cb.checked;
}

function draw() {
  background(255);
  grid.display();

  // drawLecturer(lecturer);
  // drawPrez(prez);
}

function drawPrez(on) {
  if (on) {
    let ind = 0;
    let xp, yp; // stores of previous X and Y for plotting lines
    for (let yr = yearStart; yr < 2025; yr++) {
      let s = str(yr);
      let data = table.getColumn(s);
      let pcr = data[3]; //per course rate

      if (pcr != "" && pcr != undefined) {
        // console.log(int(pcr));

        pcr = convertCSVPCR(pcr);

        let y = map(int(pcr), moneyMax, moneyMin, margin, height - margin);
        let x = ind * colSpacing + margin;

        textSize(24);
        text(pcr, x, y);
        if (xp != null) {
          push();

          strokeWeight(2);
          stroke("blue");
          line(xp, yp, x, y);
          pop();
        }

        xp = x;
        yp = y;
      }
      ind++;
    }
  }
}

function drawLecturer(on) {
  if (on) {
    let ind = 0;
    let xp, yp; // stores of previous X and Y for plotting lines
    for (let yr = yearStart; yr < 2025; yr++) {
      let s = str(yr);
      let data = table.getColumn(s);
      let pcr = data[0]; //per course rate

      if (pcr != "" && pcr != undefined) {
        // console.log(int(pcr));

        pcr = convertCSVPCR(pcr);

        let y = map(int(pcr), moneyMax, moneyMin, margin, height - margin);
        let x = ind * colSpacing + margin;

        textSize(24);
        text(pcr, x, y);
        if (xp != null) {
          push();

          strokeWeight(2);
          stroke("blue");
          line(xp, yp, x, y);
          pop();
        }

        xp = x;
        yp = y;
      }
      ind++;
    }
  }
}

function convertCSVPCR(pcr) {
  pcr = matchAll(pcr, "[0-9]");

  pcr.splice(4, 2);

  pcr = join(pcr, "");
  return pcr;
}

function drawGrid() {}
