import styled from "@emotion/styled";

const InputCheckboxBasic = (props) => {
  const {
    required,
    width,
    height,
    border,
    borderRadius,
    background,
    margin,
    padding,
    gridArea,
    color,
    _onChange,
    checked,
  } = props;

  const styles = {
    width,
    height,
    border,
    borderRadius,
    background,
    margin,
    padding,
    gridArea,
    color,
  };

  return (
    <ElInput
      {...styles}
      type="checkbox"
      required={required}
      onChange={_onChange}
      checked={checked}
    />
  );
};
export default InputCheckboxBasic;

InputCheckboxBasic.defaultProps = {
  width: "1rem",
  height: "1rem",
  border: "2px solid ##000",
  // borderRadius: "0.5rem",
  background: "#fff",
  padding: "",
  margin: "",
  gridArea: "",
  color: "",
  // checked: false,
  _onChange: () => {},
};

const ElInput = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  grid-area: ${({ gridArea }) => gridArea};
  color: ${({ color }) => color};
  appearance: none;
  :checked {
    background: ${(props) => (props.checked ? `${props.background}` : "#ccc")};
    border: ${({ border }) => border};
  }
`;
