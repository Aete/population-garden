import styled from "styled-components";
import { tablet } from "../../utils/style";

export const ChapterTitle = styled.h2`
  font-weight: 400;
  font-size: 64px;
  line-height: 110%;
  letter-spacing: 0.45em;
  color: #ffffff;
  margin-bottom: 80px;

  @media (max-width: ${tablet}px) {
    font-size: 36px;
    text-align: center;
    margin-bottom: 30px;
  }
`;

export const ChapterText = styled.p`
  width: 100%;
  font-weight: 300;
  font-size: 20px;
  line-height: 160%;
  letter-spacing: 0.05em;
  color: #eee;
`;

export const ChapterTextKR = styled.p`
  width: 100%;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 300;
  font-size: 19px;
  line-height: 160%;
  letter-spacing: 0.05em;
  color: #eee;
  margin-top: 25px;
  word-break: keep-all;

`;

export const ChapterTextUL = styled.ul`
  list-style-type: disc;
  font-weight: 300;
  font-size: 20px;
  line-height: 160%;
  letter-spacing: 0.05em;
  color: #eee;
  margin-left: 20px;
  width: 100%;

  & > li {
    margin-bottom: 10px;
  }

  @media (max-width: ${tablet}px) {
    font-size: 17px;
    margin-left: 40px;
  }
`;

export const ChapterTextULSmall = styled.ul`
  list-style-type: disc;
  font-weight: 300;
  font-size: 17px;
  line-height: 200%;
  letter-spacing: 0.05em;
  color: #eee;
  margin-left: 20px;
  margin-bottom: 5px;

  @media (max-width: ${tablet}px) {
    font-size: 14px;
  }
`;

export const BoldText = styled.span`
  font-weight: 500;
`;

export const ChapterTextULKR = styled.ul`
  list-style-type: disc;
  width: 100%;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 300;
  font-size: 19px;
  line-height: 160%;
  letter-spacing: 0.05em;
  color: #eee;
  margin-top: 25px;
  word-break: keep-all;
  margin-left: 20px;

  & > li {
    margin-bottom: 10px;
  }

  @media (max-width: ${tablet}px) {
    font-size: 17px;
    margin-left: 40px;
  }
`;
