import styled from "styled-components";
import { tablet } from "../../utils/style";

const AboutContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ImgContainer = styled.div`
  width: calc((100% - 20px) / 2);
  @media (max-width: ${tablet}px) {
    display: hidden;
  }
  background-color: #ffffff;
`;

const TextContainer = styled.div`
  width: calc((100% - 20px) / 2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ChapterTitle = styled.h2`
  font-weight: 400;
  font-size: 64px;
  line-height: 110%;
  letter-spacing: 0.45em;
  color: #ffffff;
  margin-bottom: 60px;
`;

const ChapterText = styled.p`
  width: 100%;
  font-weight: 300;
  font-size: 20px;
  line-height: 160%;
  letter-spacing: 0.05em;
  color: #eee;
`;

export default function About(): JSX.Element {
  return (
    <AboutContainer>
      <TextContainer>
        <ChapterTitle>About</ChapterTitle>
        <ChapterText>
          asdfasdfasdf asdf sad fsad fasdf sa asdf asd fsa asdfasdf asdf sad
          asdf asdf asdf asd f
        </ChapterText>
      </TextContainer>
      <ImgContainer>Image</ImgContainer>
    </AboutContainer>
  );
}
