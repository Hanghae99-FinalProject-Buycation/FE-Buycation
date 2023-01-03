import styled from "@emotion/styled";

const InputBasic = (props) => {
  const {
    name,
    type,
    placeholder,
    autoComplete,
    required,
    width,
    height,
    border,
    borderRadius,
    background,
    margin,
    padding,
    _onChange,
  } = props;

  const styles = {
    width,
    height,
    border,
    borderRadius,
    background,
    margin,
    padding,
  };

  return (
    <ElInput
      {...styles}
      name={name}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      onChange={_onChange}
    />
  );
};
export default InputBasic;

InputBasic.defaultProps = {
  width: "100%",
  height: "2.5rem",
  border: "1px solid #f5f5f5",
  borderRadius: "0.5rem",
  background: "#e7e7e7",
  padding: "0.5rem",
  margin: "",
  name: "",
  placeholder: "",
  _onChange: () => {},
};

const ElInput = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  background: ${({ background }) => background};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
`;
