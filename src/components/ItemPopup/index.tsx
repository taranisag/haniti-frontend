import React from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { PopupActions } from "../../hooks/useItem";

const Body = styled.div`
  padding: 40px;
`;

const ItemPopup: React.FC<{
  itemPopupRef: React.Ref<any>;
}> = ({ itemPopupRef }) => {
  return (
    <Popup
      ref={itemPopupRef}
      position="center center"
      closeOnDocumentClick={false}
    >
      <Body>
        <button>Bottom</button>
        <button>Top</button>
      </Body>
    </Popup>
  );
};

export default ItemPopup;
