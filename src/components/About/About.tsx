import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { tablet } from "../../utils/style";
import { ChapterTitle, ChapterText, ChapterTextKR } from "../common/text";

import Sample from "./Sample";

const Description = styled.div`
  grid-column: 1 / span 5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: ${tablet}px) {
    width: 100%;
    min-height: 0;
    align-items: center;
  }
`;

const Container = styled.div`
  height: 100vh;
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

export default function About(): JSX.Element {
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

  if (isTabletOrSmaller) {
    return (
      <Container>
        <Description>
          <AboutTitle />
          <Sample />
          <AboutText />
        </Description>
      </Container>
    );
  } else {
    return (
      <Container>
        <Description>
          <AboutTitle />
          <AboutText />
        </Description>
        <Sample />
      </Container>
    );
  }
}

function AboutTitle(): JSX.Element {
  return <ChapterTitle>About</ChapterTitle>;
}

function AboutText(): JSX.Element {
  return (
    <>
      <ChapterText>
        This project was done as part of the Generative Art Lab exhibition at
        ModuLabs in 2023. Based on Seoul's living population data, I visualized
        the estimated number of people in 26 districts (gu) on a monthly and
        hourly basis.
      </ChapterText>
      <ChapterTextKR>
        이 프로젝트는 2023년에 진행했던 모두의 연구소 Generative Art 전시의
        일환으로 진행되었다. 서울시 생활인구 데이터를 바탕으로 26개의 자치구의
        생활인구를 월별, 시간별로 표현하였다.
      </ChapterTextKR>
    </>
  );
}
