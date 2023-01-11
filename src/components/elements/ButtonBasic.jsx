import styled from "@emotion/styled";

const ButtonBasic = (props) => {
  const {
    type,
    width,
    height,
    border,
    borderRadius,
    fontSize,
    color,
    background,
    padding,
    gridArea,
    display,
    alignItems,
    justifyContent,
    children,
    _onClick,
  } = props;

  const styles = {
    width,
    height,
    border,
    borderRadius,
    fontSize,
    color,
    background,
    padding,
    gridArea,
    display,
    alignItems,
    justifyContent,
  };

  return (
    <ElBtn {...styles} type={type} onClick={_onClick}>
      {children}
    </ElBtn>
  );
};

export default ButtonBasic;

ButtonBasic.defaultProps = {
  type: "button",
  width: "100%",
  height: "3.188rem",
  border: "1px solid #FFFFFF",
  borderRadius: "0.5rem",
  fontSize: "1rem",
  color: "#FFFFFF",
  background: "#FF5A5F",
  padding: "0.5rem",
  gridArea: "",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  _onClick: () => {},
};

const ElBtn = styled.button`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color }) => color};
  background: ${({ background }) => background};
  padding: ${({ padding }) => padding};
  grid-area: ${({ gridArea }) => gridArea};
  display: ${({ display }) => display};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  cursor: pointer;
`;
