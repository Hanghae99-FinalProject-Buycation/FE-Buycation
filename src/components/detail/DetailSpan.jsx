import React from "react";
import styled from "@emotion/styled";

const DetailSpan = (props) => {
  const { titleText, bodyText, fontSize, fontWeight, color } = props;
  const styles = { fontSize, fontWeight, color };
  return (
    <ElSpan>
      <span>{titleText}</span>
      <span {...styles}>{bodyText}</span>
    </ElSpan>
  );
};

DetailSpan.defaultProps = {
  fontSize: "1rem",
  fontWeight: "",
};

export default DetailSpan;

const ElSpan = styled.div`
  display: flex;
  flex-direction: column;
  span:first-of-type {
    display: inline-block;
    margin-bottom: ${({ theme }) => theme.lineHeight.perSpan};
  }
  span:last-of-type {
    font-size: ${({ fontSize }) => fontSize};
    font-weight: ${({ fontWeight }) => fontWeight};
    color: ${({ color }) => color};
  }
`;
