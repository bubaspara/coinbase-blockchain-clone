import React from "react";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";

const Coin = ({ coin }) => {
  return (
    <Wrapper>
      <div>
        <DivFlex3>
          <NameCol>
            <CoinIcon>
              <Image src={coin.logo} alt={coin.name} />
            </CoinIcon>
            <div>
              <Primary>{coin.name}</Primary>
              <Secondary>{coin.sign}</Secondary>
            </div>
          </NameCol>
        </DivFlex3>
        <DivFlex2>
          <Primary>
            {"$"}
            {coin.balanceUsd}
          </Primary>
          <Secondary>
            {coin.balanceCoin}
            {coin.sign}
          </Secondary>
        </DivFlex2>
        <DivFlex1>
          <Primary>
            {"$"}
            {coin.priceUsd}
          </Primary>
          <div style={{ color: coin.change < 0 ? "#f0616d" : "#26ad75" }}>
            {coin.change > 0 && "+"} {coin.change}%
          </div>
        </DivFlex1>
        <DivFlex1>{coin.allocation}%</DivFlex1>
        <DivFlex0>
          <BsThreeDotsVertical />
        </DivFlex0>
      </div>
    </Wrapper>
  );
};

export default Coin;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }
`;

const NameCol = styled.div`
  display: flex;
  align-items: center;
`;

const CoinIcon = styled.div`
  width: 1.8rem;
  margin-right: 1rem;
`;

const Primary = styled.div`
  margin-bottom: 0.1rem;
`;

const Secondary = styled.div`
  color: #8a919e;
  font-size: 0.8rem;
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
