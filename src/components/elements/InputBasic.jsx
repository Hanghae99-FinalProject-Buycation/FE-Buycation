import styled from "@emotion/styled";

const InputBasic = (props) => {
  const {
    type,
    name,
    placeholder,
    required,
    width,
    height,
    padding,
    _onChange,
  } = props;
  const styles = { width: width, height: height, padding: padding };
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
  placeholder: "",
  name: "",
  _onChange: () => {},
};

export default InputBasic;

const ElInput = styled.input`
  width: "100%";
  height: "";
  padding: "";
`;
