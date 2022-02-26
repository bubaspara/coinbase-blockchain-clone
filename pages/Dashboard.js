import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Main from "../components/Main";
import Side from "../components/Side";

const Dashboard = ({ address }) => {
  return (
    <Wrapper>
      <Side />
      <MainContainer>
        <Header />
        <Main />
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
`;

const MainContainer = styled.div`
  flex: 1;
`;
