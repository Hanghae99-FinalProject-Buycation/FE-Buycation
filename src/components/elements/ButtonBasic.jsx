import styled from "@emotion/styled";

const ButtonBasic = (props) => {
  const { type, _onClick, width, height, padding, borderRadius, children } =
    props;
  const styles = {
    width: width,
    height: height,
    padding: padding,
    borderRadius: borderRadius,
  };
  return (
    <ElBtn {...styles} type={type} onClick={_onClick}>
      {children}
    </ElBtn>
  );
};

ButtonBasic.defaultProps = {
  // type: "button",
  onClick: () => {},
};

export default ButtonBasic;

const ElBtn = styled.button`
  width: "100%";
  height: "";
  padding: "";
  cursor: pointer;
`;
