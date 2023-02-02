import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputBasic from "../elements/InputBasic";
import ButtonBasic from "../elements/ButtonBasic";
import Postcode from "../postcode/Postcode";
import usePostcode from "../../hooks/usePostcode";
import Swal from "sweetalert2";
import { FaLink } from "react-icons/fa";
import { __getDetail } from "../../redux/modules/details/detailSlice";
import { sendRegisterModalStatus } from "../../redux/modules/postcode/postcodeModalSlice";
import { __getPostingList } from "../../redux/modules/main/postingListSlice";
import { __putPosting } from "../../redux/modules/modifyPosting/modifyPostingSlice";
import { selectCategory } from "../../utils/option";
import { uploadImg } from "../../utils/uploadImg";
import { perBudget } from "../posting/perBudget";

const ModifyPosting = () => {
  const { kakao } = window;
  const postingId = Number(useParams().postingId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { address } = usePostcode();
  const [postData, setPostData] = useState({
    category: "",
    title: "",
    content: "",
    address: address,
    addressDetail: "",
    totalMembers: "",
    dueDate: "",
    dueTime: "",
    budget: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const postcodeModalStatus = useSelector(
    (state) => state.postcodeModal.openRegisterModal
  );
  const getDatas = useSelector((state) => state.getDetail.getDetail);
  const createDateForm = `${postData.dueDate} ${postData.dueTime}`;
  const geocoder = new kakao.maps.services.Geocoder(); //좌표 객체 생성
  const [coords, setCoords] = useState({
    coordsX: "",
    coordsY: "",
  });

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
  const onClickSubmitHandler = () => {
    if (
      postData.category !== "" &&
      postData.title !== "" &&
      postData.content !== "" &&
      // address !== "" &&
      postData.totalMembers !== "" &&
      postData.dueDate !== "" &&
      postData.dueTime !== "" &&
      postData.budget !== "" &&
      imageFile !== null
    ) {
      uploadImg(imageFile)
        .then((data) => {
          const modifiedContent = {
            title: postData.title,
            category: postData.category,
            address: address ? address : getDatas.address,
            addressDetail: postData.addressDetail,
            content: postData.content,
            dueDate: createDateForm,
            budget: parseInt(postData.budget),
            image: data.Location,
            totalMembers: parseInt(postData.totalMembers),
            coordsX: coords.coordsX,
            coordsY: coords.coordsY,
          };
          dispatch(__putPosting({ postingId, modifiedContent }));
          dispatch(__getDetail(postingId));
          // useBuyLocation 터지는 문제 떄문에 임시로 메인으로 이동
          // navigate(`../details/${postingId}`);
          navigate(`/`);
        })
        .catch((err) => {
          //console.log("업로드 실패");
        });
    } else {
      Swal.fire({
        text: "모든 입력칸을 입력해 주세요 :)",
        confirmButtonColor: "#FF5A5F",
      });
    }
  };

  const onClickModifyHandler = () => {
    if (
      postData.category !== "" &&
      postData.title !== "" &&
      postData.content !== "" &&
      // address !== "" &&
      postData.totalMembers !== "" &&
      postData.dueDate !== "" &&
      postData.dueTime !== "" &&
      postData.budget !== ""
    ) {
      const modifiedContent = {
        title: postData.title,
        category: postData.category,
        address: address ? address : getDatas.address,
        addressDetail: postData.addressDetail,
        content: postData.content,
        dueDate: createDateForm,
        budget: parseInt(postData.budget),
        image: getDatas.image,
        totalMembers: parseInt(postData.totalMembers),
        coordsX: coords.coordsX === "" ? getDatas.coordsX : coords.coordsX,
        coordsY: coords.coordsY === "" ? getDatas.coordsY : coords.coordsY,
      };
      dispatch(__putPosting({ postingId, modifiedContent })).then((res) => {
        Swal.fire({
          text: "게시글 수정에 성공하였습니다.",
          confirmButtonColor: "#ff5a5f",
        });
        dispatch(__getDetail(postingId));
      });
      navigate(`../details/${postingId}`);
    }
  };
  const onClickCloseHandler = () => {
    navigate(`../details/${postingId}`);
  };

  useEffect(() => {
    if (address !== "") {
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          setCoords({ coordsX: coords.La, coordsY: coords.Ma });
        }
      });
    }
  }, [address]);

  useEffect(() => {
    dispatch(__getDetail(postingId));
    if (getDatas) {
      setPostData({
        ...getDatas,
        dueDate: getDatas.dueDate?.split(" ")[0],
        dueTime: getDatas.dueDate?.split(" ")[1],
      });
    }
  }, [dispatch]);

  return (
    <Wrap>
      {postcodeModalStatus && <Postcode width="90%" />}
      <Container>
        <p>공구 글쓰기</p>
        <PostingForm>
          <LeftDivForm>
            <SelectInput
              name="category"
              onChange={onChangeValueHandler}
              defaultValue={getDatas?.category}
            >
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
              <AddressInput
                name="address"
                value={address ? address : getDatas?.address}
                onChange={onChangeValueHandler}
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
                name="addressDetail"
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
                min={
                  getDatas?.currentMembers < 2 ? 2 : getDatas?.currentMembers
                }
                name="totalMembers"
                type="number"
                defaultValue={getDatas?.totalMembers}
                placeholder="숫자만 입력 (본인 포함, 최소 2인)"
                _onChange={onChangeValueHandler}
              />
              <label>모집 마감일 선택</label>
              <InputBasic
                name="dueDate"
                type="date"
                _onChange={onChangeValueHandler}
                defaultValue={getDatas.dueDate?.split(" ")[0]}
              />
              <label>모집 마감 시간 선택</label>
              <InputBasic
                name="dueTime"
                type="time"
                _onChange={onChangeValueHandler}
                defaultValue={getDatas.dueDate?.split(" ")[1]}
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
              <ButtonBasic
                _onClick={() =>
                  getDatas?.image !== null && imageFile === null
                    ? onClickModifyHandler()
                    : onClickSubmitHandler()
                }
              >
                등록
              </ButtonBasic>
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
const AddressInput = styled.input`
  width: 100%;
  height: 1.938rem;
  border: 1px solid #d9d9d9;
  border-radius: 0.5rem;
  background: white;
  padding: 0.8rem;
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
