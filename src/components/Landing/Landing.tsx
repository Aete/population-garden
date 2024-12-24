import styled from "styled-components";
import Title from "./Title";
import { tablet } from "../../utils/style";
import About from "./About";

const LandingContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #212121;
  font-family: "Roboto", sans-serif;
  padding: 0 150px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: ${tablet}px) {
    padding: 0 20px;
  }
`;

export default function Landing(): JSX.Element {
  return (
    <LandingContainer>
      <Title />
      <About />
    </LandingContainer>
  );
}
