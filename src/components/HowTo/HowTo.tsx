import styled from "styled-components";
import { tablet } from "../../utils/style";
import { ChapterText, ChapterTextKR } from "../common/text";

import Sample from "../About/Sample";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
`;

const Description = styled.div`
  grid-column: 1 / span 5;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: ${tablet}px) {
    grid-column: span 12;
    align-items: center;
  }
`;

export const ChapterTitle = styled.h2`
  font-weight: 400;
  font-size: 64px;
  line-height: 110%;
  letter-spacing: 0.2em;
  color: #ffffff;
  margin-bottom: 60px;

  @media (max-width: ${tablet}px) {
    font-size: 24px;
    text-align: center;
    margin-bottom: 30px;
  }
`;

export default function HowTo(): JSX.Element {
  return (
    <Container>
      <Description>
        <ChapterTitle>How to read?</ChapterTitle>
        <ChapterText>
          This project was done as part of the Generative Art Lab exhibition at
          ModuLabs in 2023. Based on Seoul's living population data, I
          visualized the estimated number of people in 26 districts (gu) on a
          monthly and hourly basis.
        </ChapterText>
        <ChapterTextKR>
          이 프로젝트는 2023년에 진행했던 모두의 연구소 Generative Art 전시의
          일환으로 진행되었다. 서울시 생활인구 데이터를 바탕으로 26개의 자치구의
          생활인구를 월별, 시간별로 표현하였다.
        </ChapterTextKR>
      </Description>
    </Container>
  );
}
