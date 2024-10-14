class Plot {
  constructor(row) {
    this.row = row;
    this.min = 0;
    this.max = 0;
    this.data = table.getRow(this.row);
    this.display = true;
    this.color = color(random(255), random(255), random(255));
    this.input = createInput("checked", "checkbox");
    this.initialize();
  }
  initialize() {
    let ind = 0;
    // for (let yr = yearStart; yr < 2025; yr++) {
    //   let s = str(yr);
    //   this.data = table.getColumn(s);
    //   let pcr = this.data[this.row]; //per course rate

    //   if (pcr == "" || pcr == undefined) {
    //     this.data.push(null);
    //   } else {
    //     pcr = convertCSVPCR(pcr);
    //     this.data.push(pcr);
    //   }
    // }
    console.log(this.data);
  }
  display() {
    strokeWeight(2);
    stroke(this.color);
    stroke("blue");
    line(xp, yp, x, y);
    pop();
  }
}

class Graph {
  constructor() {
    this.rows = 10;
    this.cols = 14;
  }

  display() {
    let yr = yearStart;
    let ind = 0;
    let xp, yp; // stores of previous X and Y for plotting lines
    for (let x = margin; x < width - margin; x += colSpacing) {
      stroke(0, 255);
      noFill();
      line(x, margin, x, height - margin);
      textSize(12);
      text(yr, x - 5, height - margin + textSize());
      yr++;
    }
  }
}
