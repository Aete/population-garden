import { ReactP5Wrapper, P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import styled from "styled-components";
import { tablet } from "../../utils/style";
import { useState, useEffect, useRef } from "react";
import data from "../../utils/2022_monthly.json";
import { guCodeArray } from "../../utils/metadata";

import Flower from "../common/Flower/Flower";

interface Demension {
  width: number;
  height: number;
}

interface SampleSketchProps {
  dimension: Demension;
  [key: string]: any;
}

interface FlowerData {
  [key: string]: Flower;
}

const sketch: Sketch<SampleSketchProps> = (
  p: P5CanvasInstance<SampleSketchProps>
) => {
  let flowers: FlowerData = {};
  p.setup = () => {
    p.createCanvas(0, 0);
    p.background("#212121");
  };

  p.updateWithProps = ({ dimension }: SampleSketchProps) => {
    const { width, height } = dimension;
    if (width && height) {
      const numColumn: number = width > 600 ? 5 : 3;
      let numFlowers = innerWidth > tablet ? numColumn * 5 : numColumn;
      flowers = {};
      p.resizeCanvas(width, height);
      p.background("#212121");
      data
        .filter((d) => d.month === 202211)
        .slice(0, numFlowers)
        .forEach((d, i) => {
          const guName = guCodeArray.find((gu) => gu.code === d.gu)?.nameKR;
          const x =
            (i % numColumn) * (width / numColumn) + width / (numColumn * 2);
          const y =
            Math.floor(i / numColumn) * ((height - 200) / 5) + height / 10 + 75;
          if (guName) {
            flowers[guName] = new Flower(
              x,
              y,
              d.data as [number, number, number, number][],
              guName,
              true,
              0.00008
            );
          }
        });
    }
    for (const key in flowers) {
      flowers[key].display(p as P5CanvasInstance);
    }

    p.noLoop();
  };

  p.draw = () => {};
};

const Container = styled.div`
  grid-column: 7 / span 6;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  @media screen and (max-width: ${tablet}px) {
    width: 100%;
    height: 200px;
    margin-top: 20px;
    margin-bottom: 40px;
  }
`;

export default function Sample(): JSX.Element {
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
          height: innerWidth > tablet ? innerHeight : 180,
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
      <ReactP5Wrapper sketch={sketch} dimension={dimension} />
    </Container>
  );
}
