import { ReactP5Wrapper, P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import styled from "styled-components";
import Flower from "../common/Flower/Flower";
import data from "../../utils/2022_monthly.json";
import { guCodeArray } from "../../utils/metadata";
import { useEffect, useRef, useState } from "react";
import { Position } from "./Dashboard";
import { tablet } from "../../utils/style";

interface Demension {
  width: number;
  height: number;
}

interface SampleSketchProps {
  dimension: Demension;
  position: Position;
  [key: string]: any;
}

interface FlowerData {
  [key: string]: Flower[];
}

const sketch: Sketch<SampleSketchProps> = (
  p: P5CanvasInstance<SampleSketchProps>
) => {
  const flowers: FlowerData = {};
  const targetPosition: Position = { x: 0, y: 0 };
  const currentPos: Position = { x: -1, y: -1 };
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
      p.text(`${i + 202201}`, hPosition, vAxis);
    }
    p.pop();
    // draw the axis anotation - gu
    p.push();
    p.translate(0, y * vGap);
    p.fill("#aaa");
    p.textSize(13);
    p.textAlign(p.RIGHT, p.CENTER);
    for (let i = 0; i < 25; i++) {
      p.text(guCodeArray[i].nameKR, hAxis, i * vGap + vStart);
    }
    p.pop();

    // erase the area outside the grid
    p.fill("#212121");
    p.noStroke();
    p.rect(0, 0, hPad, vPad);
    p.rect(0, p.height - vPad + 30, hPad, vPad + 30);

    //
  };
};

interface GraphProps {
  position: Position;
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

export default function Graph({ position }: GraphProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState<Demension>({
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
      <ReactP5Wrapper
        sketch={sketch}
        dimension={dimension}
        position={position}
      />
    </Container>
  );
}
