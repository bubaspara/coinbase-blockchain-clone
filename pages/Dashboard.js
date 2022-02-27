import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Main from "../components/Main";
import Side from "../components/Side";
import { ethers } from "ethers";
import { ThirdwebSDK } from "@3rdweb/sdk";

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.NEXT_PUBLIC_METAMASK_KEY,
    ethers.getDefaultProvider(
      "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    )
  )
);

const Dashboard = ({ walletAddress }) => {
  const [sanityTokens, setSanityTokens] = useState([]);
  const [thirdWebTokens, setThirdWebTokens] = useState([]);

  useEffect(() => {
    const getSanityAndThirdWebTokens = async () => {
      const coins = await fetch(
        "https://ethdq3bv.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D%22coins%22%5D%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%2C%0A%7D"
      );
      const tempSanityTokens = (await coins.json()).result;
      setSanityTokens(tempSanityTokens);

      setThirdWebTokens(
        tempSanityTokens.map((token) =>
          sdk.getTokenModule(token.contractAddress)
        )
      );
    };
    return getSanityAndThirdWebTokens();
  }, []);

  return (
    <Wrapper>
      <Side />
      <MainContainer>
        <Header
          walletAddress={walletAddress}
          sanityTokens={sanityTokens}
          thirdWebTokens={thirdWebTokens}
        />
        <Main
          sanityTokens={sanityTokens}
          thirdWebTokens={thirdWebTokens}
          walletAddress={walletAddress}
        />
      </MainContainer>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #0a0b0d;
  color: white;
  overflow: hidden;
`;

const MainContainer = styled.div`
  flex: 1;
`;
