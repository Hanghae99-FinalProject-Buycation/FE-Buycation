import React from "react";
import styled from "@emotion/styled";

const DetailSpan = (props) => {
  const { titleText, bodyText, fontSize, fontWeight } = props;
  const styles = { fontSize, fontWeight };
  return (
    <ElSpan>
      <span>{titleText}</span>
      <br />
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
  span:first-of-type {
    display: inline-block;
    margin-bottom: ${({ theme }) => theme.lineHeight.perSpan};
  }
  span:last-of-type {
    font-size: ${({ fontSize }) => fontSize};
    font-weight: ${({ fontWeight }) => fontWeight};
  }
`;
