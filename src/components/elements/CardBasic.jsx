import styled from "@emotion/styled";
import { FaFileExcel, FaLinux } from "react-icons/fa";

const CardBasic = (props) => {
  const {
    height,
    display,
    border,
    borderTop,
    background,
    margin,
    padding,
    children,
    _onClick,
  } = props;

  const styles = {
    height,
    display,
    border,
    borderTop,
    background,
    margin,
    padding,
  };

  return (
    <ElCard {...styles} onClick={_onClick}>
      {children}
    </ElCard>
  );
};

export default CardBasic;

CardBasic.defaultProps = {
  height: "100%",
  borderTop: "1px solid #f5f5f5",
  background: "while",
  padding: "1rem 0",
  _onClick: () => {},
};

const ElCard = styled.div`
  height: ${({ height }) => height};
  display: ${({ display }) => display};
  border: ${({ border }) => border};
  border-top: ${({ borderTop }) => borderTop};
  background: ${({ background }) => background};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`;
