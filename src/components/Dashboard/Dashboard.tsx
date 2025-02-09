import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Graph from "./Graph";
import { tablet } from "../../utils/style";
import { ChapterTextUL, ChapterTextULKR, ChapterTitle } from "../common/text";
import ColorLegend from "../common/ColorLegend";

export interface Position {
  x: number;
  y: number;
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CornerButton = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 50%;
  z-index: 2;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center;

  &:hover {
    background-color: #fff;
  }

  &:hover svg {
    fill: black;
  }

  & svg {
    fill: white;
    width: 16px;
    height: 16px;
  }
`;

const TopButton = styled(CornerButton)`
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  &:active {
    transform: scale(0.9) translateX(-55%);
  }
  @media screen and (max-width: ${tablet}px) {
    top: 15px;
  }
`;

const LeftButton = styled(CornerButton)`
  top: 50%;
  left: 0;
  transform: translateY(-50%);

  &:active {
    transform: scale(0.9) translateY(-55%);
  }
`;

const BottomButton = styled(CornerButton)`
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);

  &:active {
    transform: scale(0.9) translateX(-55%);
  }

  @media screen and (max-width: ${tablet}px) {
    bottom: 15px;
  }
`;
const RightButton = styled(CornerButton)`
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  &:active {
    transform: scale(0.9) translateY(-55%);
  }
`;

export default function Dashboard(): JSX.Element {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  const handleMove = (x: number, y: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setPosition({ x: position.x + x, y: position.y + y });
  };

  useEffect(() => {
    const throttle = (func: () => void, limit: number) => {
      let inThrottle: boolean;
      return function () {
        if (!inThrottle) {
          func();
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    const handleScroll = throttle(() => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        setIsTitleVisible(rect.top <= window.innerHeight * 0.5);
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container ref={titleRef}>
      <ChapterTitle style={{ letterSpacing: "0.25em" }}>
        Visualization
      </ChapterTitle>
      <ChapterTextUL>
        <li>Click arrows to navigate</li>
        <li>Click charts for more detailed information</li>
      </ChapterTextUL>
      <ChapterTextULKR>
        <li>화살표를 눌러 대시보드를 움직여보세요</li>
        <li>차트를 클릭하시면, 더 자세한 정보를 볼 수 있습니다.</li>
      </ChapterTextULKR>

      <Container>
        <TopButton onClick={(e) => handleMove(0, 1, e)}>
          <svg viewBox="0 0 24 24">
            <path d="M12 2l-10 10h6v10h8v-10h6z" />
          </svg>
        </TopButton>
        <LeftButton onClick={(e) => handleMove(1, 0, e)}>
          <svg viewBox="0 0 24 24">
            <path d="M2 12l10-10v6h10v8h-10v6z" />
          </svg>
        </LeftButton>
        <BottomButton onClick={(e) => handleMove(0, -1, e)}>
          <svg viewBox="0 0 24 24">
            <path d="M12 22l10-10h-6v-10h-8v10h-6z" />
          </svg>
        </BottomButton>
        <RightButton onClick={(e) => handleMove(-1, 0, e)}>
          <svg viewBox="0 0 24 24">
            <path d="M22 12l-10 10v-6h-10v-8h10v-6z" />
          </svg>
        </RightButton>

        <Graph position={position} isRender={isTitleVisible} />
        <ColorLegend />
      </Container>
    </Container>
  );
}
