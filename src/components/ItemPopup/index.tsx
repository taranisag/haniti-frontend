import React, { useRef } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { ShowPopupType } from "../../hooks/useItem";

const Body = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 20px;
  background-color: #ffffff;

  > button {
    margin: 10px 0;
  }
`;

const ItemPopup: React.FC<{
  showPopup: ShowPopupType;
  onClick: (id: any) => void;
}> = ({ showPopup, onClick }) => {
  const ref = useRef<any>();

  if (!showPopup) {
    return null;
  }

  return (
    <Popup
      ref={ref}
      position="center center"
      defaultOpen
      onClose={() => onClick(showPopup.fallback)}
    >
      <Body>
        <button onClick={() => onClick(showPopup.topId)}>Top</button>
        <button onClick={() => onClick(showPopup.bottomId)}>Bottom</button>
      </Body>
    </Popup>
  );
};

export default ItemPopup;
