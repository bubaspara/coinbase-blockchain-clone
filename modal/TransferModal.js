import { useState } from "react";
import styled from "styled-components";
import CoinSelector from "./CoinSelector";
import Transfer from "./Transfer";

const TransferModal = ({ sanityTokens, thirdWebTokens, walletAddress }) => {
  const [action, setAction] = useState("send");
  const [selectedToken, setSelectedToken] = useState(sanityTokens[0]);

  const selectedModal = (option) => {
    switch (option) {
      case "send":
        return (
          <Transfer
            selectedToken={selectedToken}
            setAction={setAction}
            thirdWebTokens={thirdWebTokens}
            walletAddress={walletAddress}
          />
        );
      case "receive":
        return <h2>Receive</h2>;
      case "select":
        return (
          <CoinSelector
            setAction={setAction}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            sanityTokens={sanityTokens}
            thirdWebTokens={thirdWebTokens}
            walletAddress={walletAddress}
          />
        );
      case "transferring":
        return "";
      case "transferred":
        return "";
      default:
        <h2>Send</h2>;
    }
  };

  return (
    <Wrapper>
      <Selector>
        <Option
          onClick={() => setAction("send")}
          style={action === "send" ? selectedStyle : unselectedStyle}
        >
          <p>Send</p>
        </Option>
        <Option
          onClick={() => setAction("receive")}
          style={action === "receive" ? selectedStyle : unselectedStyle}
        >
          <p>Receive</p>
        </Option>
      </Selector>
      <ModalMain>{selectedModal(action)}</ModalMain>
    </Wrapper>
  );
};

export default TransferModal;

const Wrapper = styled.div`
  height: 35rem;
  width: 27rem;
  color: white;
  border: 1px solid #282b2f;
  display: flex;
  flex-direction: column;
`;

const Selector = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 5rem;
`;

const Option = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: #111214;
  }
`;

const ModalMain = styled.div`
  padding: 1rem;
  flex: 1;
`;

//Custom Styles
const selectedStyle = {
  color: "#3773f5",
};

const unselectedStyle = {
  border: "1px solid #282b2f",
};
