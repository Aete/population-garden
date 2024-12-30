import styled from "styled-components";
import { tablet } from "../../utils/style";

export const ChapterTitle = styled.h2`
  font-weight: 400;
  font-size: 64px;
  line-height: 110%;
  letter-spacing: 0.45em;
  color: #ffffff;
  margin-bottom: 60px;

  @media (max-width: ${tablet}px) {
    font-size: 36px;
    text-align: center;
  }
`;

export const ChapterText = styled.p`
  width: 100%;
  font-weight: 300;
  font-size: 20px;
  line-height: 160%;
  letter-spacing: 0.05em;
  color: #eee;

  @media (max-width: ${tablet}px) {
    text-align: center;
  }
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

  @media (max-width: ${tablet}px) {
    text-align: center;
  }
`;
