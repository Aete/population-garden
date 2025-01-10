import styled from "styled-components";
import { tablet } from "../../utils/style";
import ScrollDown from "./ScrollDown";

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: ${tablet}px) {
    margin-bottom: 80px;
  }
`;

const PageTitle = styled.h1`
  font-size: 128px;
  font-weight: 700;
  text-align: center;
  line-height: 125%;
  color: #ffffff;
  letter-spacing: 0.05em;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    font-size: 108px;
    margin-bottom: 100px;
    line-height: 110%;
  }

  @media (max-width: ${tablet}px) {
    font-size: 48px;
    margin-bottom: 50px;
  }
`;

const PageSubTitle = styled.p`
  font-family: "Noto Serif", serif;
  font-weight: 400;
  font-size: 32px;
  color: #fff;
  text-align: center;
  line-height: 160%;
  letter-spacing: 0.05em;
  @media (max-width: ${tablet}px) {
    font-size: 18px;
  }
`;

export default function Title(): JSX.Element {
  return (
    <Container>
      <PageTitle>Population Garden</PageTitle>
      <PageSubTitle>
        Visualization of Seoul Living Population 2022 ~ 2023
      </PageSubTitle>
      <ScrollDown />
    </Container>
  );
}
