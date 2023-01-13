import React, { useState } from "react";
import styled from "@emotion/styled";
import { FaTimes, FaLink } from "react-icons/fa";
import InputBasic from "../../elements/InputBasic";
import ButtonBasic from "../../elements/ButtonBasic";

const EditProfileModal = (props) => {
  const [editValue, setEditValue] = useState({
    nickname: "",
    address: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const onChangeValueHandler = (event) => {
    const { name, value } = event.target;
    setEditValue({
      ...editValue,
      [name]: value,
    });
  };
  console.log("입력값확인:", editValue);

  return (
    <Backdrop>
      <ModalCard>
        <Header>
          <p>프로필 수정</p>
          <CloseBtn onClick={props.onClose}>
            <FaTimes size="1.3rem" />
          </CloseBtn>
        </Header>

        <ContentsBox>
          <Item>
            <label>닉네임 변경</label>
            <ButtonBasic>중복 체크</ButtonBasic>
          </Item>
          <InputBasic
            name="nickname"
            height="2rem"
            _onChange={onChangeValueHandler}
          />

          <label>프로필 변경</label>
          <FileInput>
            <input type="file" name="image" />
            <FaLink />
          </FileInput>

          <Item>
            <label>주소 변경</label>
            <ButtonBasic>주소 찾기</ButtonBasic>
          </Item>
          <InputBasic name="address" height="2rem" />

          <ButtonBasic margin="10px 0" height="2.5rem">
            수정
          </ButtonBasic>
        </ContentsBox>
      </ModalCard>
    </Backdrop>
  );
};

export default EditProfileModal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.75);
`;
const ModalCard = styled.div`
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 20%;
  width: 37rem;
  z-index: 10;
  background: white;
  border-radius: 5px;
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;
const Header = styled.header`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayStrong};
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: ${({ theme }) => theme.fontSize.xl};
    margin: auto;
  }
`;
const CloseBtn = styled.button`
  background: none;
  cursor: pointer;
`;
const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem;
`;
const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 5rem;
    height: 2rem;
    background: inherit;
    border: 1px solid #ff5a5f;
    color: ${({ theme }) => theme.colors.main};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
const FileInput = styled.div`
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.grayWeak};
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  input {
    width: 100%;
    background: none;
    color: ${({ theme }) => theme.colors.grayMid};
  }
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;
