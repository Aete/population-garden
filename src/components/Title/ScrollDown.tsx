import styled, { keyframes } from "styled-components";
import { tablet } from "../../utils/style";

const scrollAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
`;

const ScrollDownContainer = styled.div`
  position: absolute;
  bottom: 100px;

  width: 200px;
  height: 50px;
  font-size: 24px;
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  animation: ${scrollAnimation} 2s infinite;

  border: 1px solid #ffffff;
  border-radius: 25px;

  @media (max-width: ${tablet}px) {
    font-size: 16px;
    width: 150px;
    height: 40px;
    border-radius: 20px;
  }

  @media (max-height: 400px) {
    bottom: 50px;
  }
`;

const Arrow = styled.span`
  margin-left: 5px;
  font-size: 18px;

  @media (max-width: ${tablet}px) {
    font-size: 12px;
  }
`;

export default function ScrollDown(): JSX.Element {
  return (
    <ScrollDownContainer>
      <p>
        Scroll Down <Arrow>▼</Arrow>
      </p>
    </ScrollDownContainer>
  );
}
