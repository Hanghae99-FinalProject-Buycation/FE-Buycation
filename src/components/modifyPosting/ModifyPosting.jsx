import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import InputBasic from "../elements/InputBasic";
import ButtonBasic from "../elements/ButtonBasic";
import { FaLink } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { __postPosting } from "../../redux/modules/posting/postingSlice";
import { __getDetail } from "../../redux/modules/details/detailSlice";
import { sendRegisterModalStatus } from "../../redux/modules/postcode/postcodeModalSlice";
import Postcode from "../postcode/Postcode";
import usePostcode from "../../hooks/usePostcode";
import { selectCategory } from "../../utils/option";
import { uploadImg } from "../../utils/uploadImg";
import { perBudget } from "../posting/perBudget";
import { __putPosting } from "../../redux/modules/modifyPosting/modifyPostingSlice";

const ModifyPosting = () => {
  const { kakao } = window;
  const postingId = Number(useParams().postingId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modData, setModData] = useState({});
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
  const getDatas = useSelector((state) => state.getDetail.getDetail);
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

  useEffect(() => {
    dispatch(__getDetail(postingId));
    if (getDatas !== {}) {
      setModData(getDatas);
    }
  }, [dispatch]);

  const onClickPostcodeHandler = () => {
    dispatch(sendRegisterModalStatus(true));
  };

  const onChangeFileInputHandler = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const onChangeValueHandler = (event) => {
    const { name, value } = event.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };
  // console.log("입력값확인:", postData);
  // console.log("imageFile", imageFile);

  const onClickSubmitHandler = () => {
    if (
      postData.category !== "" &&
      postData.title !== "" &&
      postData.content !== "" &&
      address !== "" &&
      postData.totalMembers !== "" &&
      postData.dueDate !== "" &&
      // postData.dueTime !== "" &&
      postData.budget !== "" &&
      imageFile !== null
    ) {
      uploadImg(imageFile)
        .then((data) => {
          const modifiedContent = {
            title: postData.title,
            category: postData.category,
            address: address,
            content: postData.content,
            dueDate: createDateForm,
            budget: parseInt(postData.budget),
            image: data.Location,
            totalMembers: parseInt(postData.totalMembers),
            coordsX: coords.coordsX,
            coordsY: coords.coordsY,
          };
          console.log(postingId, modifiedContent);
          dispatch(__putPosting(postingId, modifiedContent));
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
    <Wrap>
      <Postcode hidden={!postcodeModalStatus} />
      <Container>
        <p>공구 글쓰기</p>
        <PostingForm>
          <LeftDivForm>
            <SelectInput name="category" onChange={onChangeValueHandler}>
              <option value="">카테고리를 선택해 주세요.</option>
              {selectCategory.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </SelectInput>
            <InputBasic
              height="2.25rem"
              name="title"
              placeholder="제목을 입력해 주세요."
              _onChange={onChangeValueHandler}
              defaultValue={getDatas?.title}
            />
            <TextArea
              name="content"
              placeholder="내용을 입력해 주세요."
              onChange={onChangeValueHandler}
              defaultValue={getDatas?.content}
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
                name="address"
                // placeholder="이웃과 거래하고 싶은 장소를 선택해 주세요."
                placeholder={getDatas?.address}
                value={address}
                defaultValue={getDatas?.address}
                _onChange={onChangeValueHandler}
              />
              <ButtonBasic
                width="5rem"
                height="1.938rem"
                fontSize="14px"
                _onClick={onClickPostcodeHandler}
              >
                주소 찾기
              </ButtonBasic>
            </Label>
            <Label>
              상세주소
              <InputBasic
                name="detailAddress"
                placeholder="선택 사항"
                _onChange={onChangeValueHandler}
                defaultValue={getDatas?.addressDetail}
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
                defaultValue={getDatas?.totalMembers}
              />
              <label>모집 마감일 선택</label>
              <InputBasic
                name="dueDate"
                type="date"
                _onChange={onChangeValueHandler}
                defaultValue={getDatas?.dueDate.split(" ", 1)}
              />
              <label>모집 마감 시간 선택</label>
              <InputBasic
                name="dueTime"
                type="time"
                _onChange={onChangeValueHandler}
                defaultValue={getDatas?.dueDate.split(" ")[1]}
              />
              <label>결제 정보</label>
              <InputBasic
                min="0"
                name="budget"
                type="number"
                placeholder="공구 물품의 금액을 입력해주세요."
                _onChange={onChangeValueHandler}
                defaultValue={getDatas?.budget}
              />
              <span>
                1인당 결제 금액
                <span>
                  {perBudget(postData.budget, postData.totalMembers)}원
                </span>
              </span>
            </SelectInputForm>
            <ButtonForm>
              <ButtonBasic _onClick={onClickSubmitHandler}>등록</ButtonBasic>
              <ButtonBasic _onClick={onClickCloseHandler}>닫기</ButtonBasic>
            </ButtonForm>
          </RightDivForm>
        </PostingForm>
      </Container>
    </Wrap>
  );
};

export default ModifyPosting;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem 1.5rem;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 1392px;
  height: 100%;
  p {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 600;
    padding-bottom: 2rem;
    border-bottom: 3px solid ${({ theme }) => theme.colors.main};
  }
`;
const PostingForm = styled.div`
  width: 100%;
  display: flex;
  margin-top: 2rem;
  gap: 2rem;
  @media screen and (max-width: 768px) {
    height: 100%;
    flex-direction: column;
  }
`;
const LeftDivForm = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;
const SelectInput = styled.select`
  width: 50%;
  height: 2.25rem;
  padding: 0.5rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.grayWeak};
  border-radius: 0.5rem;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const Label = styled.label`
  display: grid;
  grid-template-columns: 7rem 22rem 5rem;
  grid-template-rows: repeat(1, 1fr);
  align-items: center;
  gap: 8px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 20rem;
  border: 1px solid ${({ theme }) => theme.colors.grayWeak};
  border-radius: 0.5rem;
  padding: 1.8rem;
`;
const FileInput = styled.div`
  width: 22rem;
  height: 1.938rem;
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
const RightDivForm = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media screen and (max-width: 760px) {
    width: 100%;
    height: 100%;
    padding-bottom: 1rem;
  }
`;
const SelectInputForm = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grayStrong};
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  label {
    margin: 24px 0 8px 0;
  }
  & > span {
    border-top: 1px solid ${({ theme }) => theme.colors.grayStrong};
    margin-top: 1.5rem;
    padding: 8px 0 24px 0;
    display: flex;
    justify-content: space-between;
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
  & > span > span {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 600;
  }
`;
const ButtonForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  button:nth-of-type(2) {
    background: transparent;
    color: ${({ theme }) => theme.colors.grayStrong};
    border: 1px solid ${({ theme }) => theme.colors.grayStrong};
  }
`;
