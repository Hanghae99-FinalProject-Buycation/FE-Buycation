import React from "react";
import styled from "@emotion/styled";

const DetailSpan = (props) => {
  const { titleText, bodyText, fontSize, fontWeight, color, margin, padding } =
    props;
  const styles = { fontSize, fontWeight, color, margin, padding };
  return (
    <ElSpan {...styles}>
      <span>{titleText}</span>
      <span>{bodyText}</span>
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
  padding: ${({ padding }) => padding};
  span:first-of-type {
    display: inline-block;
    margin: ${({ margin }) => (margin ? margin : "0 0 16px")};
  }
  span:last-of-type {
    font-size: ${({ fontSize }) => fontSize};
    font-weight: ${({ fontWeight }) => fontWeight};
    color: ${({ color }) => color};
  }
`;
