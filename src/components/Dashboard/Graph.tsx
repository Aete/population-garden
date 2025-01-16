import { ReactP5Wrapper, P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import styled from "styled-components";
import Flower from "../common/Flower/Flower";
import data from "../../utils/2022_monthly.json";
import { guCodeArray, monthArray } from "../../utils/metadata";
import { useEffect, useRef, useState } from "react";
import { Position } from "./Dashboard";
import { tablet } from "../../utils/style";

interface Dimension {
  width: number;
  height: number;
}

interface SampleSketchProps {
  dimension: Dimension;
  position: Position;
  isRender: boolean;
  [key: string]: any;
}

interface FlowerData {
  [key: string]: Flower[];
}

interface Selection {
  gu: string;
  month: number;
}

interface BarChartLayout {
  x: number;
  y: number;
  width: number;
  height: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
}

interface BarData {
  totalPop: number;
  malePop: number;
  femalePop: number;
  coords: [number, number, number, number];
}

const sketch: Sketch<SampleSketchProps> = (
  p: P5CanvasInstance<SampleSketchProps>
) => {
  const flowers: FlowerData = {};
  const targetPosition: Position = { x: 0, y: 0 };
  const currentPos: Position = { x: -1, y: 0 };
  const currentSelection: Selection = {
    gu: "",
    month: -1,
  };
  let detailIsOpen: boolean = false;
  let currentData: Flower;

  const scales = {
    large: {
      scale: 0.00008, // scale of the flower
      hGap: 200, // horizontal gap between flowers
      vGap: 150, // vertical gap between flowers
      hStart: 100,
      vStart: 120,
      vPad: 180,
      hPad: 120,
      vAxis: 150,
      hAxis: 110,
    },
    small: {
      scale: 0.00006, // scale of the flower
      hGap: 100, // horizontal gap between flowers
      vGap: 100, // vertical gap between flowers
      hStart: 120,
      vStart: 180,
      vPad: 130,
      hPad: 110,
      vAxis: 100,
      hAxis: 110,
    },
  };

  const threshold = 800;

  const flowerCount = {
    x: 0,
    y: 0,
  };

  const mouseDetection = (): Selection => {
    const { x: targetX, y: targetY } = targetPosition;
    const { hGap, vGap, hStart, vStart } =
      p.width > threshold ? scales.large : scales.small;
    let gu = "";
    let month = -1;
    // calculate which gu and month are selected based on the mouse position
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 25; j++) {
        const hPosition = i * hGap + hStart + hGap / 2;
        const vPosition = j * vGap + vStart;
        if (p.dist(p.mouseX, p.mouseY, hPosition, vPosition) < 50) {
          const guIndex = Math.floor((vPosition - vStart) / vGap) - targetY;
          const monthIndex =
            Math.floor((hPosition - hStart - hGap / 2) / hGap) - targetX;
          gu = guCodeArray[guIndex]?.nameKR;
          month = 202201 + monthIndex;
        }
      }
    }
    return { gu, month };
  };

  p.setup = () => {
    p.createCanvas(0, 0);
    p.background("#212121");
  };

  p.updateWithProps = ({ dimension, position }: SampleSketchProps) => {
    const { width, height } = dimension;
    const { x, y } = position;
    if (width && height) {
      p.resizeCanvas(width, height);
      const { hGap, vGap, hStart, vStart } =
        width > threshold ? scales.large : scales.small;
      flowerCount.x = Math.floor(width / hGap);
      flowerCount.y = Math.floor(height / vGap);
      guCodeArray.forEach((gu) => {
        flowers[gu.nameKR] = [];
      });
      p.background("#212121");
      data.forEach((d) => {
        const guName = guCodeArray.find((gu) => gu.code === d.gu)?.nameKR;
        const guIndex = guCodeArray.findIndex((gu) => gu.code === d.gu);
        const x = (d.month - 202201) * hGap + hStart + hGap / 2;
        const y = Math.floor(guIndex) * vGap + vStart;
        if (guName) {
          flowers[guName].push(
            new Flower(
              x,
              y,
              d.data as [number, number, number, number][],
              guName,
              false,
              width > tablet ? scales.large.scale : scales.small.scale,
              d.month,
              guIndex
            )
          );
        }
      });
    }
    targetPosition.x = x;
    targetPosition.y = y;
  };

  p.draw = () => {
    const { x, y } = currentPos;
    const { x: targetX, y: targetY } = targetPosition;
    const { gu: hoveredGu, month: hoveredMonth } = mouseDetection();
    const { gu: selectedGu, month: selectedMonth } = currentSelection;

    p.background("#212121");
    const { hGap, vGap, hStart, vStart, vPad, hPad, vAxis, hAxis } =
      p.width > threshold ? scales.large : scales.small;
    p.push();
    p.translate(x * hGap, y * vGap);
    // draw grid - vertical
    for (let i = 0; i < 12; i++) {
      p.stroke("#636363");
      const hPosition = i * hGap + hStart + hGap / 2;
      p.line(hPosition, 0, hPosition, vGap * 26);
    }
    // draw grid - horizontal
    for (let i = 0; i < 25; i++) {
      p.stroke("#636363");
      p.line(hStart - hGap, i * vGap + vStart, hGap * 13, i * vGap + vStart);
    }
    // draw the flowers
    for (const key in flowers) {
      const startMonth = 202201 - targetX;
      const startGuIndex = -1 * targetY;
      flowers[key].forEach((f) => {
        if (Math.abs(startGuIndex - f.guIndex) > flowerCount.y + 1) {
          return;
        }
        if (Math.abs(startMonth - f.month) < flowerCount.x + 1) {
          f.display(p as P5CanvasInstance);
        }
      });
    }
    p.pop();

    // update the current position for the animation
    currentPos.x = p.lerp(currentPos.x, targetX, 0.2);
    currentPos.y = p.lerp(currentPos.y, targetY, 0.2);

    // erase the area outside the grid
    p.fill("#212121");
    p.noStroke();
    p.rect(-100, 0, p.width + 150, vPad);
    p.fill("#212121");
    p.rect(0, p.height - vPad + 30, p.width, vPad);
    p.fill("#212121");
    p.rect(0, 0, hPad, p.height + 100);

    // draw the axis anotation - month
    p.push();
    p.translate(x * hGap, 0);
    p.fill("#aaa");
    p.textSize(13);
    p.textAlign(p.CENTER, p.CENTER);

    for (let i = 0; i < 12; i++) {
      const hPosition = i * hGap + hStart + hGap / 2;
      const month = 202201 + i;
      if ([hoveredMonth, selectedMonth].includes(month)) {
        p.fill("#fff");
      } else {
        p.fill("#aaa");
      }
      p.text(month, hPosition, vAxis);
    }
    p.pop();

    // draw the axis anotation - gu
    p.push();
    p.translate(0, y * vGap);
    p.textSize(13);
    p.textAlign(p.RIGHT, p.CENTER);
    for (let i = 0; i < 25; i++) {
      const guName = guCodeArray[i]?.nameKR;
      if ([hoveredGu, selectedGu].includes(guName)) {
        p.fill("#fff");
      } else {
        p.fill("#aaa");
      }
      p.text(guCodeArray[i].nameKR, hAxis, i * vGap + vStart);
    }
    p.pop();

    // erase the area outside the grid
    p.fill("#212121");
    p.noStroke();
    p.rect(0, 0, hPad, vPad);
    p.rect(0, p.height - vPad + 30, hPad, vPad + 30);

    if (detailIsOpen && currentData !== undefined) {
      // draw a stacked bar chart of the population data by gender
      const data = currentData.data;
      const layout: BarChartLayout = {
        x: p.width - hGap * 3 - 50,
        y: 0,
        width: hGap * 3 + 50,
        height: p.height,
        paddingLeft: 50,
        paddingRight: 0,
        paddingTop: hAxis,
        paddingBottom: 100,
      };

      const chartStartX = layout.x + layout.paddingLeft;
      const chartStartY = layout.y + layout.paddingTop + 50;

      // background of the chart
      p.fill("rgba(33, 33, 33, 0.9)");
      p.rect(
        layout.x,
        layout.y,
        layout.x + layout.width,
        layout.y + layout.height
      );
      p.noStroke();
      p.fill("#fff");
      p.textSize(16);
      p.textAlign(p.LEFT, p.CENTER);
      p.text(
        `${currentSelection.gu}  /  ${
          monthArray[currentSelection.month - 202201]
        }. 2022`,
        layout.x + layout.paddingLeft - 20,
        layout.y + layout.paddingTop
      );

      const xScaler = (value: number): number => {
        return p.map(
          value,
          0,
          1200000,
          chartStartX,
          layout.x + layout.width - layout.paddingRight
        );
      };

      const yScaler = (value: number): number => {
        return p.map(
          value,
          -1,
          24,
          chartStartY,
          layout.y + layout.height - layout.paddingBottom
        );
      };

      // draw the axis
      p.noFill();
      p.stroke("#ccc");
      p.line(xScaler(0), yScaler(-1), xScaler(0), yScaler(24));
      for (let i = 0; i < 24; i++) {
        p.noStroke();
        p.textAlign(p.RIGHT, p.CENTER);
        p.textSize(12);
        p.fill("#ccc");
        p.text(i, chartStartX - 10, yScaler(i) + 2.5);
      }
      p.textAlign(p.LEFT, p.CENTER);
      p.text("hour of the day", chartStartX, yScaler(24) + 20);

      // draw a chart grid
      p.drawingContext.setLineDash([3, 3]);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(12);
      p.fill("#ccc");
      p.strokeWeight(0.5);
      for (const number of [250000, 500000, 1000000]) {
        p.stroke("#ccc");
        p.line(xScaler(number), yScaler(-1), xScaler(number), yScaler(24));
        p.noStroke();
        p.text(number.toLocaleString(), xScaler(number), yScaler(-1));
      }
      p.drawingContext.setLineDash([]);

      // create a close button
      const closeBtnStartX = currentSelection.gu.length * 12 + layout.x + 110;
      p.fill("#212121");
      p.stroke("#fff");
      p.rect(closeBtnStartX, layout.y + layout.paddingTop - 10, 40, 20);
      p.fill("#fff");
      p.noStroke();
      p.textSize(12);
      p.textAlign(p.CENTER, p.CENTER);
      p.text("close", closeBtnStartX + 20, layout.y + layout.paddingTop);

      // close button hover and click effect
      if (
        p.mouseX > closeBtnStartX &&
        p.mouseX < closeBtnStartX + 40 &&
        p.mouseY > layout.y + layout.paddingTop - 10 &&
        p.mouseY < layout.y + layout.paddingTop + 10
      ) {
        p.fill("#fff");
        p.rect(closeBtnStartX, layout.y + layout.paddingTop - 10, 40, 20);
        p.fill("#212121");
        p.text("close", closeBtnStartX + 20, layout.y + layout.paddingTop);
        if (p.mouseIsPressed) {
          detailIsOpen = false;
          currentSelection.gu = "";
          currentSelection.month = -1;
        }
      }

      // draw the bars
      p.noStroke();
      const bars: BarData[] = [];
      data.forEach((d, i) => {
        const male = d[1];
        const female = d[2];
        p.fill("#aaa");
        p.rectMode(p.CORNERS);
        // male
        p.rect(xScaler(0), yScaler(i), xScaler(male), yScaler(i) + 5);
        // female
        p.fill("#fff");
        p.rect(
          xScaler(male),
          yScaler(i),
          xScaler(female) + xScaler(male) - xScaler(0),
          yScaler(i) + 5
        );
        p.rectMode(p.CORNER);
        bars.push({
          totalPop: d[0],
          malePop: d[1],
          femalePop: d[2],
          coords: [
            xScaler(0),
            yScaler(i),
            xScaler(female) + xScaler(male) - xScaler(0),
            yScaler(i) + 5,
          ],
        });
      });
      bars.forEach((bar, i) => {
        if (
          p.mouseX > bar.coords[0] &&
          p.mouseX < bar.coords[2] &&
          p.mouseY > bar.coords[1] &&
          p.mouseY < bar.coords[3]
        ) {
          p.noStroke();
          p.fill("rgba(21,21,21,0.7)");
          p.rect(p.mouseX + 20, p.mouseY, 200, 90);
          p.fill("#fff");
          p.textSize(12);
          p.textAlign(p.LEFT, p.CENTER);
          p.text(`at ${i}:00`, p.mouseX + 30, p.mouseY + 15);
          p.text(
            `total: ${bar.totalPop.toLocaleString()}`,
            p.mouseX + 30,
            p.mouseY + 40
          );
          p.text(
            `male: ${bar.malePop.toLocaleString()}`,
            p.mouseX + 30,
            p.mouseY + 60
          );
          p.text(
            `female: ${bar.femalePop.toLocaleString()}`,
            p.mouseX + 30,
            p.mouseY + 80
          );
        }
      });
    }
  };

  p.mousePressed = () => {
    const { hPad, vPad } = p.width > threshold ? scales.large : scales.small;
    if (
      p.mouseX < hPad ||
      p.mouseX > p.width - hPad ||
      p.mouseY < vPad ||
      p.mouseY > p.height - vPad
    ) {
      return;
    }
    const { gu, month } = mouseDetection();
    currentSelection.gu = gu;
    currentSelection.month = month;
    if (gu !== "" || month !== -1) {
      detailIsOpen = true;
      currentData = flowers[gu].find((f) => f.month === month) as Flower;
    } else {
      detailIsOpen = false;
    }
  };
};

interface GraphProps {
  position: Position;
  isRender: boolean;
}

const Container = styled.div`
  height: 80%;
  width: 90%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  z-index: 1;
  @media screen and (max-width: ${tablet}px) {
    width: 100%;
  }
`;

export default function Graph({ position, isRender }: GraphProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState<Dimension>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimension({
          width: containerRef.current.offsetWidth,
          height: window.innerHeight,
        });
      }
    };
    // set initial size
    updateSize();

    // add event listener
    window.addEventListener("resize", updateSize);

    // clean up: remove event listener
    return () => window.removeEventListener("resize", updateSize);
  }, [containerRef.current]);
  return (
    <Container ref={containerRef}>
      {isRender && (
        <ReactP5Wrapper
          sketch={sketch}
          dimension={dimension}
          position={position}
          isRender={isRender}
        />
      )}
    </Container>
  );
}
