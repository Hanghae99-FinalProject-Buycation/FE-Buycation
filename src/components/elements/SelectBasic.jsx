import styled from "@emotion/styled";

const SelectBasic = (props) => {
  const {
    name,
    width,
    height,
    border,
    borderRadius,
    background,
    margin,
    padding,
    value,
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
    <ElSelect {...styles} name={name} value={value} onChange={_onChange} />
  );
};
export default SelectBasic;

SelectBasic.defaultProps = {
  width: "50%",
  height: "2.8rem",
  border: "1px solid gray",
  borderRadius: "8px",
  padding: "0.8rem",
  _onChange: () => {},
};

const ElSelect = styled.select`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 1px solid ${({ theme }) => theme.colors.grayWeak};
  border-radius: ${({ borderRadius }) => borderRadius};
  background: ${({ background }) => background};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;
