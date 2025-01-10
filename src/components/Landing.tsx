import styled from "styled-components";
import Title from "./Title/Title";
import { tablet } from "../utils/style";
import About from "./About/About";
import HowTo from "./HowTo/HowTo";
import Data from "./Data/Data";
import Dashboard from "./Dashboard/Dashboard";
import { useEffect, useState } from "react";

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

  return (
    <LandingContainer>
      <Title />
      <About isTabletOrSmaller={isTabletOrSmaller} />
      <Data isTabletOrSmaller={isTabletOrSmaller} />
      <HowTo isTabletOrSmaller={isTabletOrSmaller} />
      <Dashboard />
    </LandingContainer>
  );
}
