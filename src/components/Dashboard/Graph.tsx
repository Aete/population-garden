import { ReactP5Wrapper, P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import styled from "styled-components";
import Flower from "../Flower/Flower";
import data from "../../utils/2022_monthly.json";
import { guCodeArray } from "../../utils/metadata";
import { useEffect, useRef, useState } from "react";

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
  border: 1px solid #ffffff80;
`;

interface Demension {
  width: number;
  height: number;
}

interface SampleSketchProps {
  dimension: Demension;
  [key: string]: any;
}

interface FlowerData {
  [key: string]: Flower[];
}

const sketch: Sketch<SampleSketchProps> = (
  p: P5CanvasInstance<SampleSketchProps>
) => {
  const flowers: FlowerData = {};
  guCodeArray.forEach((gu) => {
    flowers[gu.nameKR] = [];
  });
  p.setup = () => {
    p.createCanvas(0, 0);
    p.background("#212121");
  };

  p.updateWithProps = ({ dimension }: SampleSketchProps) => {
    const { width, height } = dimension;
    if (width && height) {
      p.resizeCanvas(width, height);
      p.background("#212121");
      data.forEach((d) => {
        const guName = guCodeArray.find((gu) => gu.code === d.gu)?.nameKR;
        const guIndex = guCodeArray.findIndex((gu) => gu.code === d.gu);
        const x = (d.month - 202201) * (width / 5) + width / 10;
        const y = Math.floor(guIndex) * ((height - 200) / 5) + height / 10 + 75;
        if (guName) {
          flowers[guName].push(
            new Flower(
              x,
              y,
              d.data as [number, number, number, number][],
              guName
            )
          );
        }
      });
    }
    for (const key in flowers) {
      flowers[key].forEach((f) => f.display(p as P5CanvasInstance));
    }

    p.noLoop();
  };

  p.draw = () => {};
};

export default function Dashboard(): JSX.Element {
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
