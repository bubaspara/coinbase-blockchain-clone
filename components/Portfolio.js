import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { coins } from "../static/coins";
import Coin from "./Coin";
import BalanceChart from "./BalanceChart";

const Portfolio = ({ sanityTokens, thirdWebTokens, walletAddress }) => {
  const [walletBalance, setWalletBalance] = useState(0);

  const tokenToUSD = {};
  for (const token of sanityTokens) {
    tokenToUSD[token.contractAddress] = Number(token.usdPrice);
  }

  useEffect(() => {
    //A bit complicated
    const calculateTotalBalance = async () => {
      const totalBalance = await Promise.all(
        thirdWebTokens.map(async (token) => {
          const balance = await token.balanceOf(walletAddress);
          return Number(balance.displayValue) * tokenToUSD[token.address];
        })
      );
      setWalletBalance(totalBalance.reduce((a, b) => a + b, 0));
    };

    return calculateTotalBalance();
  }, [thirdWebTokens, sanityTokens]);

  return (
    <Wrapper>
      <Content>
        <Chart>
          <div>
            <Balance>
              <BalanceTitle>Portfolio Balance</BalanceTitle>
              <BalanceValue>
                {"$"}
                {walletBalance.toLocaleString()}
              </BalanceValue>
            </Balance>
          </div>
          <BalanceChart />
        </Chart>
        <PortfolioTable>
          <TableItem>
            <Title>Your Assets</Title>
          </TableItem>
          <Divider />
          <Table>
            <TableItem>
              <TableRow>
                <DivFlex3>Name</DivFlex3>
                <DivFlex2>Balance</DivFlex2>
                <DivFlex1>Price</DivFlex1>
                <DivFlex1>Allocation</DivFlex1>
                <DivFlex0>
                  <BsThreeDotsVertical />
                </DivFlex0>
              </TableRow>
            </TableItem>
            <Divider />
            <div>
              {coins.map((coin, idx) => (
                <div key={idx}>
                  <Coin coin={coin} />
                  <Divider />
                </div>
              ))}
            </div>
          </Table>
        </PortfolioTable>
      </Content>
    </Wrapper>
  );
};

export default Portfolio;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 2rem 1rem;
`;

const PortfolioTable = styled.div`
  margin-top: 1rem;
  border: 1px solid #282b2f;
`;

const Table = styled.table`
  width: 100%;
`;

const TableRow = styled.tr`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > th {
    text-align: left;
  }
`;

const TableItem = styled.div`
  padding: 1rem 2rem;
`;

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const DivFlex3 = styled.div`
  flex: 3;
`;
const DivFlex2 = styled.div`
  flex: 2;
`;
const DivFlex1 = styled.div`
  flex: 1;
`;
const DivFlex0 = styled.div`
  flex: 0;
`;

const Chart = styled.div`
  border: 1px solid #282b2f;
  padding: 1rem 2rem;
  max-height: 70vh;
`;

const Balance = styled.div``;

const BalanceTitle = styled.div`
  color: #8a919e;
  font-size: 0.9rem;
`;

const BalanceValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.5rem 0;
`;
