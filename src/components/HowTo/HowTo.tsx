import styled from "styled-components";
import { tablet } from "../../utils/style";
import {
  BoldText,
  ChapterTextUL,
  ChapterTextULKR,
  ChapterTextULSmall,
} from "../common/text";
import legendVideo from "../../utils/legend.mp4";
import { useEffect, useState } from "react";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;

  @media (max-width: ${tablet}px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Description = styled.div`
  grid-column: 1 / span 5;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: ${tablet}px) {
    grid-column: span 12;
    align-items: center;
    margin-bottom: 100px;
  }
`;

const ChapterTitle = styled.h2`
  font-weight: 400;
  font-size: 64px;
  line-height: 110%;
  letter-spacing: 0.2em;
  color: #ffffff;
  margin-bottom: 60px;

  @media (max-width: ${tablet}px) {
    font-size: 36px;
    text-align: center;
    margin-bottom: 20px;
  }
`;

const LegendContainer = styled.div`
  grid-column: 7 / span 6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;

  @media screen and (max-width: ${tablet}px) {
    width: 100%;
  }
`;

const LegendVideo = styled.video`
  width: 90%;

  @media (max-width: ${tablet}px) {
    margin-bottom: 40px;
  }
`;

export default function HowTo(): JSX.Element {
  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(
    window.innerWidth <= tablet
  );

  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrSmaller(window.innerWidth <= tablet);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isTabletOrSmaller) {
    return (
      <Container>
        <Description>
          <ChapterTitle>How to read?</ChapterTitle>
          <HowToText />
        </Description>
        <LegendContainer>
          <LegendVideo src={legendVideo} autoPlay loop muted />
        </LegendContainer>
      </Container>
    );
  } else {
    return (
      <Container>
        <Description>
          <ChapterTitle>How to read?</ChapterTitle>
          <LegendContainer>
            <LegendVideo src={legendVideo} autoPlay loop muted />
          </LegendContainer>
          <HowToText />
        </Description>
      </Container>
    );
  }
}

function HowToText(): JSX.Element {
  return (
    <>
      <ChapterTextUL>
        <li>
          <BoldText>Angle</BoldText>: hour of day (0 ~ 23){" "}
        </li>
        <li>
          <BoldText>Radius</BoldText>: monthly and hourly population in the
          districts (gu)
          <ChapterTextULSmall>
            <li> inner grid circle: 250,000</li>
            <li> outer grid circle: 500,000</li>
          </ChapterTextULSmall>{" "}
        </li>
        <li>
          <BoldText>Color</BoldText>: % of female
        </li>
      </ChapterTextUL>
      <ChapterTextULKR>
        <li>
          <BoldText>각도</BoldText>: 시간대 (0 ~ 23){" "}
        </li>
        <li>
          <BoldText>길이</BoldText>: 자치구의 월별, 시간별 인구수
          <ChapterTextULSmall>
            <li> 안쪽 원형 눈금: 250,000</li>
            <li> 바깥쪽 원형 눈금: 500,000</li>
          </ChapterTextULSmall>{" "}
        </li>
        <li>
          <BoldText>Color</BoldText>: % of female
        </li>
      </ChapterTextULKR>
    </>
  );
}
