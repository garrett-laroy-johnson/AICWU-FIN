let yearStart = 2009;
let margin = 10;
let moneyMin = 3000;
let moneyMax = 7000;
let yRes = 1000;

let numCols;
let colSpacing;

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
  noLoop();
  // print (table.getRowCount() + ' total rows');
  //print (table.getColumnCount() + ' total columns');
}

function draw() {
  background(255);
  drawGrid();
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

function convertCSVPCR(pcr) {
  pcr = matchAll(pcr, "[0-9]");

  pcr.splice(4, 2);

  pcr = join(pcr, "");

  return pcr;
}

function drawGrid() {
  let yr = yearStart;
  for (let x = margin; x < width - margin; x += colSpacing) {
    stroke(0, 50);
    line(x, margin, x, height - margin);
    text(yr, x - 5, height - margin + textSize());
    yr++;
  }

  let numRows = (moneyMax - moneyMin) / yRes;
  console.log(numRows);
  let rowSpacing = (height - margin * 2) / numRows;
  console.log(rowSpacing);
  let money = moneyMax;
  for (let y = margin; y < height - margin; y += rowSpacing) {
    text("$" + money, margin - 30, y);
    money -= yRes;
    // console.log(money);
  }
}
