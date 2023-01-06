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
      onChange={_onChange}
      inValid={inValid}
    />
  );
};
export default InputBasic;

InputBasic.defaultProps = {
  width: "100%",
  height: "2.5rem",
  border: "1px solid #e7e7e7",
  borderRadius: "8px",
  background: "white",
  margin: "",
  padding: "0.8rem",
  gridArea: "",
  name: "",
  placeholder: "",
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
