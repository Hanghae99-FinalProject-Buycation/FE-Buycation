import styled from "@emotion/styled";

const InputBasic = (props) => {
  const {
    name,
    type,
    placeholder,
    autoComplete,
    min,
    required,
    width,
    height,
    border,
    borderRadius,
    background,
    margin,
    padding,
    gridArea,
    value,
    defaultValue,
    _onChange,
    inValid,
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
  };

  return (
    <ElInput
      {...styles}
      name={name}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      min={min}
      required={required}
      value={value}
      defaultValue={defaultValue}
      onChange={_onChange}
      inValid={inValid}
    />
  );
};
export default InputBasic;

InputBasic.defaultProps = {
  width: "100%",
  height: "1.938rem",
  border: "1px solid #D9D9D9",
  borderRadius: "8px",
  background: "white",
  margin: "",
  padding: "0.8rem",
  gridArea: "",
  name: "",
  placeholder: "",
  defaultValue: "",
  _onChange: () => {},
};

const ElInput = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${(style) => (style.inValid ? "1px solid red" : `${style.border}`)};
  border-radius: ${({ borderRadius }) => borderRadius};
  background: ${({ background }) => background};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  grid-area: ${({ gridArea }) => gridArea};
`;
