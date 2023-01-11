import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import InputBasic from "../elements/InputBasic";
import ButtonBasic from "../elements/ButtonBasic";
import { FaLink } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { sendRegisterModalStatus } from "../../redux/modules/postcode/postcodeModalSlice";
import { __postPosting } from "../../redux/modules/postingSlice";
import Postcode from "../postcode/Postcode";
import usePostcode from "../../hooks/usePostcode";
import { selectCategory } from "../../utils/option";
import { uploadImg } from "../../utils/uploadImg";
import { perBudget } from "./perBudget";

const Posting = () => {
  const { kakao } = window;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    category: "",
    title: "",
    content: "",
    detailAddress: "",
    totalMembers: "",
    dueDate: "",
    dueTime: "",
    budget: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const createDateForm = `${postData.dueDate} ${postData.dueTime}`;
  const postcodeModalStatus = useSelector(
    (state) => state.postcodeModal.openRegisterModal
  );
  const { address } = usePostcode();
  const geocoder = new kakao.maps.services.Geocoder(); //좌표 객체 생성
  const [coords, setCoords] = useState({
    coordsX: "",
    coordsY: "",
  });

  useEffect(() => {
    if (address !== "") {
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          console.log(coords);
          setCoords({ coordsX: coords.La, coordsY: coords.Ma });
        }
      });
    }
  }, [address]);

  const onClickPostcodeHandler = () => {
    dispatch(sendRegisterModalStatus(true));
  };

  const onChangeValueHandler = (event) => {
    const { name, value } = event.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };
  console.log("입력값확인:", postData);

  const onChangeFileInputHandler = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const onClickSubmitHandler = () => {
    if (
      postData.category !== "" &&
      postData.title !== "" &&
      postData.content !== "" &&
      address !== "" &&
      postData.totalMembers !== "" &&
      postData.dueDate !== "" &&
      postData.dueTime !== "" &&
      postData.budget !== "" &&
      imageFile !== null
    ) {
      uploadImg(imageFile)
        .then((data) => {
          const newPostData = {
            category: postData.category,
            title: postData.title,
            content: postData.content,
            address: address,
            totalMembers: parseInt(postData.totalMembers),
            dueDate: createDateForm,
            budget: parseInt(postData.budget),
            image: data.Location,
            coordsX: coords.coordsX,
            coordsY: coords.coordsY,
          };
          dispatch(__postPosting(newPostData));
          //navigate("/")
        })
        .catch((err) => {
          console.log("업로드 실패");
        });
    } else {
      alert("모든 입력칸을 입력해 주세요 :)");
    }
  };

  const onClickCloseHandler = () => {
    navigate("/");
  };

  return (
    <Container>
      <Postcode hidden={!postcodeModalStatus} />
      <PostingForm>
        <LeftDivForm>
          <p>공구 글쓰기</p>
          <SelectInput name="category" onChange={onChangeValueHandler}>
            <option value="">카테고리를 선택해 주세요.</option>
            {selectCategory.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </SelectInput>
          <InputBasic
            height="2.8rem"
            name="title"
            _onChange={onChangeValueHandler}
            placeholder="제목을 입력해 주세요."
          />
          <TextArea
            name="content"
            onChange={onChangeValueHandler}
            placeholder="내용을 입력해 주세요."
          ></TextArea>
          <Label>
            사진 첨부
            <FileInput>
              <input
                type="file"
                name="image"
                onChange={onChangeFileInputHandler}
              />
              <FaLink />
            </FileInput>
          </Label>
          <Label>
            거래 희망 주소
            <InputBasic
              height="1.8rem"
              name="address"
              placeholder="이웃과 거래하고 싶은 장소를 선택해 주세요."
              value={address}
              _onChange={onChangeValueHandler}
            />
            <ButtonBasic
              width="5rem"
              height="1.8rem"
              _onClick={onClickPostcodeHandler}
            >
              주소 찾기
            </ButtonBasic>
          </Label>
          <Label>
            상세주소
            <InputBasic
              height="1.8rem"
              name="detailAddress"
              placeholder="(선택 사항)"
              _onChange={onChangeValueHandler}
            />
          </Label>
        </LeftDivForm>
        <RightDivForm>
          <SelectInputForm>
            <label>모집 인원</label>
            <InputBasic
              min="0"
              name="totalMembers"
              type="number"
              _onChange={onChangeValueHandler}
            />
            <label>모집 마감일 선택</label>
            <InputBasic
              name="dueDate"
              type="date"
              _onChange={onChangeValueHandler}
            />
            <label>모집 마감 시간 선택</label>
            <InputBasic
              name="dueTime"
              type="time"
              _onChange={onChangeValueHandler}
            />
            <label>결제 정보</label>
            <InputBasic
              min="0"
              name="budget"
              type="number"
              placeholder="공구 물품의 금액을 입력해주세요."
              _onChange={onChangeValueHandler}
            />
            <p>
              1인당 결제 금액
              <PointContents>
                {perBudget(postData.budget, postData.totalMembers)}원
              </PointContents>
            </p>
          </SelectInputForm>
          <ButtonForm>
            <ButtonBasic _onClick={onClickSubmitHandler}>등록</ButtonBasic>
            <ButtonBasic _onClick={onClickCloseHandler}>닫기</ButtonBasic>
          </ButtonForm>
        </RightDivForm>
      </PostingForm>
    </Container>
  );
};

export default Posting;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PostingForm = styled.div`
  max-width: 1440px;
  width: 100%;
  display: flex;
  gap: 1.5rem;
  @media screen and (max-width: 760px) {
    height: 100%;
    flex-direction: column;
  }
`;
const LeftDivForm = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > p {
    font-size: ${({ theme }) => theme.fontSize.xl};
    padding-bottom: 30px;
    border-bottom: 1px solid #e7e7e7;
  }
  @media screen and (max-width: 760px) {
    width: 100%;
    height: 100%;
  }
`;
const SelectInput = styled.select`
  width: 50%;
  height: 2.8rem;
  padding: 0.5rem;
  /* border: 1px solid #e7e7e7; */
  color: #555;
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;
const Label = styled.label`
  display: grid;
  grid-template-columns: 6rem 22rem 5rem;
  grid-template-rows: repeat(1, 1fr);
  align-items: center;
  gap: 5px;
  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 18rem;
  border: 1px solid #e7e7e7;
  border-radius: 0.5rem;
  padding: 1.8rem;
  resize: none;
`;
const FileInput = styled.div`
  width: 22rem;
  height: 1.8rem;
  border: 1px solid #e7e7e7;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  & > input {
    width: 100%;
    background: none;
    color: #555;
  }
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;
const RightDivForm = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 37px;
  @media screen and (max-width: 760px) {
    width: 100%;
    height: 100%;
    padding-bottom: 1rem;
  }
`;
const SelectInputForm = styled.div`
  background: #e7e7e7;
  border-radius: 0.5rem;
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > P {
    border-top: 1px solid #888;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
  }
  & > label > span {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
const ButtonForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const PointContents = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
`;
