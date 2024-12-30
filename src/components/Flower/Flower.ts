import { P5CanvasInstance } from "@p5-wrapper/react";
import * as d3 from "d3";

// 0 for male, 1 for female
type HourlyPopulation = [number, number, number, number];

export default class Flower {
  private gridColor: string = "#636363";
  private strokeColor: string = "#cccccc";
  private cScale = d3
    .scaleDiverging(d3.interpolateRdBu)
    .domain([0.45, 0.5, 0.55]);

  constructor(
    public x: number,
    public y: number,
    public data: HourlyPopulation[],
    public gu: string
  ) {}

  private rScale(d: number): number {
    return d * 0.00008;
  }

  display(p: P5CanvasInstance): void {
    this.drawGrid(p);
    this.drawPetal(p);
    this.drawEdge(p);
    this.drawText(p);
  }

  drawGrid(p: P5CanvasInstance): void {
    const { rScale } = this;
    p.strokeWeight(1);
    p.stroke(this.gridColor);
    p.drawingContext.setLineDash([3, 3]);
    p.noFill();
    p.ellipse(this.x, this.y, rScale(500000) * 2);
    p.ellipse(this.x, this.y, rScale(250000) * 2);
  }

  drawEdge(p: P5CanvasInstance): void {
    const { rScale } = this;
    // edge of the circle
    p.stroke(this.strokeColor);
    p.drawingContext.setLineDash([]);
    p.noFill();
    p.strokeWeight(2);
    p.stroke(this.strokeColor + "75");
    // calculate the total population of the gu at 0 a.m.
    let totalPop = this.data[0][0];

    let prevEdgeX = this.x + rScale(totalPop) * Math.cos(-Math.PI / 2);
    let prevEdgeY = this.y + rScale(totalPop) * Math.sin(-Math.PI / 2);
    [...this.data, this.data[0]].forEach((d, i) => {
      const angle = ((2 * Math.PI) / 24) * i - Math.PI / 2;
      totalPop = d[0];
      const edgeX = this.x + rScale(totalPop) * Math.cos(angle);
      const edgeY = this.y + rScale(totalPop) * Math.sin(angle);
      p.line(prevEdgeX, prevEdgeY, edgeX, edgeY);
      prevEdgeX = edgeX;
      prevEdgeY = edgeY;
    });
  }

  drawPetal(p: P5CanvasInstance): void {
    this.data.forEach((d, i) => {
      const { rScale, cScale } = this;
      const angle = ((2 * Math.PI) / 24) * i - Math.PI / 2;
      const scaledPop = rScale(d[0]);
      const mRatio = d[3];
      const scaledColor = p.color(cScale(mRatio));
      scaledColor.setAlpha(180);
      p.push();
      p.translate(this.x, this.y);
      p.rotate(angle);
      p.drawingContext.setLineDash([]);
      p.strokeWeight(3);
      p.stroke(scaledColor);
      p.line(0, 0, scaledPop, 0);
      p.noStroke();
      p.pop();
    });
  }

  drawText(p: P5CanvasInstance): void {
    const { rScale } = this;
    p.noStroke();
    p.fill("#aaa");
    p.textSize(13);
    p.textAlign(p.CENTER, p.CENTER);
    const maxPop = Math.max(...this.data.map((d) => d[0]));
    if (maxPop > 500000) {
      p.text(this.gu, this.x, this.y + rScale(maxPop) + 20);
    } else {
      p.text(this.gu, this.x, this.y + rScale(500000) + 20);
    }
  }
}
