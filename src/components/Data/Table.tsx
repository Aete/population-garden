import styled from "styled-components";
import { tablet } from "../../utils/style";
import data from "../../utils/2022_monthly.json";

const TableContainer = styled.div`
  background-color: #212121;
  padding: 20px;
  border-radius: 8px;
  grid-column: 7 / span 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: ${tablet}px) {
    display: none;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: white;
`;

const StyledTh = styled.th`
  border-bottom: 2px solid #969696;
  padding: 10px;
  text-align: left;
  vertical-align: middle;
`;

const StyledTd = styled.td`
  border-bottom: 1px solid #444;
  padding: 10px;
  font-weight: 200;
`;

const StyleThRight = styled(StyledTh)`
  text-align: right;
`;

const StyleTdRight = styled(StyledTd)`
  text-align: right;
`;

interface TableProps {
  numRows: number;
}

export default function Table({ numRows }: TableProps): JSX.Element {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Gu Code</StyledTh>
            <StyleThRight>Month</StyleThRight>
            <StyleThRight>Total Population</StyleThRight>
            <StyleThRight>Male Populaton</StyleThRight>
            <StyleThRight>Female Population</StyleThRight>
            <StyleThRight>Female Ratio</StyleThRight>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, numRows).map((item) => {
            return (
              <tr key={`${item.gu}_${item.month}`}>
                <StyledTd>{item.gu}</StyledTd>
                <StyleTdRight>{item.month}</StyleTdRight>
                <StyleTdRight>
                  {Math.round(item.data[0][0]).toLocaleString()}
                </StyleTdRight>
                <StyleTdRight>
                  {Math.round(item.data[0][1]).toLocaleString()}
                </StyleTdRight>
                <StyleTdRight>
                  {Math.round(item.data[0][2]).toLocaleString()}
                </StyleTdRight>
                <StyleTdRight>
                  {Math.round((1 - item.data[0][3]) * 100) / 100}
                </StyleTdRight>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}
