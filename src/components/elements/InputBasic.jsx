import styled from "@emotion/styled";

const InputBasic = (props) => {
  const {
    type,
    name,
    placeholder,
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
      type={type}
      name={name}
      required={required}
      onChange={_onChange}
      placeholder={placeholder}
    />
  );
};

InputBasic.defaultProps = {
  width: "100%",
  height: "2.5rem",
  border: "1px solid #f5f5f5",
  borderRadius: "0.5rem",
  background: "#e7e7e7",
  margin: "",
  padding: "0.5rem",
  placeholder: "",
  name: "",
  _onChange: () => {},
};

export default InputBasic;

const ElInput = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  background: ${({ background }) => background};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`;
