import { ReactP5Wrapper, P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import styled from "styled-components";
import { tablet } from "../../utils/style";
import { useState, useEffect, useRef } from "react";
import data from "../../utils/2022_monthly.json";
import { guCodeArray } from "../../utils/metadata";

import Flower from "../Flower/Flower";

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
  const flowers: FlowerData = {};
  p.setup = () => {
    p.createCanvas(0, 0);
    p.background("#212121");
  };

  p.updateWithProps = ({ dimension }: SampleSketchProps) => {
    const { width, height } = dimension;
    if (width && height) {
      p.resizeCanvas(width, height);
      p.background("#212121");
      data
        .filter((d) => d.month === 202211)
        .forEach((d, i) => {
          const guName = guCodeArray.find((gu) => gu.code === d.gu)?.nameKR;
          const x = (i % 5) * (width / 5) + width / 10;
          const y = Math.floor(i / 5) * ((height - 200) / 5) + height / 10 + 75;
          if (guName) {
            flowers[guName] = new Flower(
              x,
              y,
              d.data as [number, number, number, number][],
              guName
            );
          }
        });
    }
  };

  p.draw = () => {
    p.background("#212121");
    for (const key in flowers) {
      flowers[key].display(p as P5CanvasInstance);
    }
  };
};

const Container = styled.div`
  grid-column: 7 / span 6;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${tablet}px) {
    display: none;
  }
  color: #ffffff;
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
      <ReactP5Wrapper sketch={sketch} dimension={dimension} />
    </Container>
  );
}
