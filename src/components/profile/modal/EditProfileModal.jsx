import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styled from "@emotion/styled";
import ModalClose from "../../../assets/headerIcon/modalClose.svg";
import { FaLink } from "@react-icons/all-files/fa/FaLink";
import InputBasic from "../../elements/InputBasic";
import ButtonBasic from "../../elements/ButtonBasic";
import { useDispatch, useSelector } from "react-redux";
import {
  __patchProfile,
  __duplicateCheck,
  __isSuccess,
} from "../../../redux/modules/profile/profileSlice";
import { sendRegisterModalStatus } from "../../../redux/modules/postcode/postcodeModalSlice";
import Postcode from "../../postcode/Postcode";
import usePostcode from "../../../hooks/usePostcode";
import { uploadImg } from "../../../utils/uploadImg";
import imageCompression from "browser-image-compression"; //이미지 사이즈 줄이기

const EditProfileModal = (props) => {
  const dispatch = useDispatch();
  const profileStateData = useSelector((state) => state.profile);
  const myProfileData = useSelector((data) => data.profile.getProfile);
  const [duplicateCheck, setDuplicateCheck] = useState(false);
  const postcodeModalStatus = useSelector(
    (state) => state.postcodeModal.openRegisterModal
  );
  const { address } = usePostcode();
  const [editValue, setEditValue] = useState({
    nickname: myProfileData.nickname,
    profileImage: myProfileData.profileImage,
    address: myProfileData.address,
  });

  useEffect(() => {
    if (address !== "") {
      setEditValue({
        ...editValue,
        address: address,
      });
    }
  }, [address, editValue]);

  useEffect(() => {
    if (profileStateData.isSuccess) {
      Swal.fire({
        text: profileStateData.alertMsg,
        confirmButtonText: "확인",
        confirmButtonColor: "#FF5A5F",
      }).then(() => {
        dispatch(__isSuccess(false));
      });
    }
  }, [profileStateData.isSuccess, profileStateData.alertMsg, dispatch]);

  const onClickDuplicateCheckHandler = () => {
    dispatch(__duplicateCheck(editValue.nickname));
    setDuplicateCheck(true);
  };

  const onClickPostcodeHandler = () => {
    dispatch(sendRegisterModalStatus(true));
  };

  const onChangeFileInputHandler = (e) => {
    const file = e.target.files[0];

    imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    }).then((compressedFile) => {
      const newFile = new File([compressedFile], file.name, {
        type: file.type,
      });

      uploadImg(newFile).then((data) => {
        setEditValue({ ...editValue, profileImage: data?.Location });
      });
    });
  };

  const onChangeValueHandler = (event) => {
    const { name, value } = event.target;
    setEditValue({
      ...editValue,
      [name]: value,
    });
  };

  const onClickEditHandler = () => {
    const newPatchData = {
      memberId: myProfileData.memberId,
      nickname: editValue.nickname,
      profileImage: editValue.profileImage,
      address: editValue.address,
    };
    if (
      myProfileData.nickname !== editValue.nickname &&
      duplicateCheck === false
    ) {
      Swal.fire({
        text: "닉네임 중복 체크를 해주세요.",
        confirmButtonText: "확인",
        confirmButtonColor: "#FF5A5F",
      });
    } else {
      dispatch(__patchProfile(newPatchData));
      props.onClose();
    }
  };

  return (
    <Backdrop>
      {postcodeModalStatus && <Postcode />}
      <ModalCard>
        <Header>
          <span>프로필 수정</span>
          <CloseBtn onClick={props.onClose}>
            <img alt="modalClose" src={ModalClose} />
          </CloseBtn>
        </Header>
        <ContentsBox>
          <Item>
            <label>닉네임 변경</label>
            <ButtonBasic _onClick={onClickDuplicateCheckHandler}>
              중복 체크
            </ButtonBasic>
          </Item>
          <InputBasic
            name="nickname"
            value={editValue.nickname}
            _onChange={onChangeValueHandler}
          />
          <Item>
            <label>프로필 변경</label>
          </Item>
          <FileInput>
            <input
              type="file"
              name="image"
              onChange={onChangeFileInputHandler}
            />
            <FaLink />
          </FileInput>
          <Item>
            <label>주소명 변경</label>
            <ButtonBasic _onClick={onClickPostcodeHandler}>
              주소 찾기
            </ButtonBasic>
          </Item>
          <InputBasic name="address" value={editValue.address} />
          <ButtonBasic height="2.5rem" _onClick={onClickEditHandler}>
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
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const Header = styled.header`
  padding: 1rem;
  height: 52px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayStrong};
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    margin: auto;
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 600;
  }
  button {
    padding: 0;
  }
  @media screen and (max-width: 768px) {
    padding: 0.6rem;
    & > span {
      font-size: ${({ theme }) => theme.fontSize.lg};
    }
  }
`;

const CloseBtn = styled.button`
  background: none;
  cursor: pointer;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const Item = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  button {
    width: 5rem;
    height: 2rem;
    background: inherit;
    border: 1px solid ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.main};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const FileInput = styled.div`
  width: 100%;
  height: 2.25rem;
  border: 1px solid ${({ theme }) => theme.colors.grayWeak};
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  input {
    width: 100%;
    height: 1rem;
    background: none;
    color: ${({ theme }) => theme.colors.grayMid};
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
