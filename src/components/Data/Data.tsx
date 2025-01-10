import styled from "styled-components";
import { tablet } from "../../utils/style";
import { ChapterTitle, ChapterText, ChapterTextKR } from "../common/text";
import Table from "./Table";

const Description = styled.div`
  grid-column: 1 / span 5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: ${tablet}px) {
    grid-column: span 12;
    align-items: center;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
`;

interface DataProps {
  isTabletOrSmaller: boolean;
}
export default function Data({ isTabletOrSmaller }: DataProps): JSX.Element {
  if (isTabletOrSmaller) {
    return (
      <Container>
        <Description>
          <ChapterTitle>Data</ChapterTitle>
          <Table numRows={3} />
          <DataText />
        </Description>
      </Container>
    );
  } else {
    return (
      <Container>
        <Description>
          <ChapterTitle>Data</ChapterTitle>
          <DataText />
        </Description>
        <Table numRows={7} />
      </Container>
    );
  }
}

function DataText(): JSX.Element {
  return (
    <>
      <ChapterText>
        Seoul's Living Population data is an estimated dataset of the population
        present in specific areas and time points in Seoul, based on mobile
        communication data (LTE) and utilizing public transportation usage
        statistics, resident registration population statistics, building
        databases and etc.
      </ChapterText>
      <ChapterTextKR>
        서울시 생활인구는 모바일 통신 데이터 (LTE)를 기반으로 대중교통 이용통계,
        주민등록인구통계, 건물 DB 등을 활용하여 서울의 특정지역, 시점에 존재하는
        인구를 추정한 데이터입니다.
      </ChapterTextKR>
    </>
  );
}
