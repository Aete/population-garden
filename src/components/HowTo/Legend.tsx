import { ReactP5Wrapper, P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import styled from "styled-components";
import { tablet } from "../../utils/style";
import { useState, useEffect, useRef } from "react";

interface Demension {
  width: number;
  height: number;
}

interface SampleSketchProps {
  dimension: Demension;
  [key: string]: any;
}

const sketch: Sketch<SampleSketchProps> = (
  p: P5CanvasInstance<SampleSketchProps>
) => {
  p.setup = () => {
    p.createCanvas(0, 0);
    p.background("#212121");
    p.frameRate(60);
  };

  p.updateWithProps = ({ dimension }: SampleSketchProps) => {
    const { width, height } = dimension;
    p.resizeCanvas(width, height);
  };

  p.draw = () => {
    p.background("#212121");
    p.fill("#ffffff");
    const centerX = p.width / 2;
    const centerY = p.height / 2;
    const targetX = centerX + 100;
    const targetY = centerY + 100;
    const progress = (p.frameCount % 20) / 20; // progress from 0 to 1 over 60 frames
    p.stroke("#ffffff");
    p.strokeWeight(2);
    p.line(
      centerX,
      centerY,
      centerX + progress * 100,
      centerY + progress * 100
    );
  };
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
