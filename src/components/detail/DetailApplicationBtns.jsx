import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import Swal from "sweetalert2";
import ButtonBasic from "../elements/ButtonBasic";
import DetailApplicationList from "./DetailApplicationList";
import {
  __cancelApplication,
  __postApplication,
} from "../../redux/modules/application/applicationSlice";
import { MdOutlineCancel } from "react-icons/md";
import { __getParticipatedList } from "../../redux/modules/profile/myListSlice";
import { __getMyProfile } from "../../redux/modules/profile/profileSlice";
import applicateBtnIcon from "../../assets/detailIcon/applicateBtnIcon.svg";

const DetailApplicationBtns = ({
  details,
  postingId,
  tokenValue,
  onClickMoveProfileHandler,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [applicationModal, setApplicationModal] = useState(false);
  const getMsg = useSelector((data) => data.applicate.postApplication);

  console.log(getMsg);

  // 403 터지는 부분
  const getProfileData = useSelector((state) => state.profile.getProfile);
  const getMemberId = getProfileData?.memberId;
  const participatedList = useSelector(
    (state) => state.myList.participatedList
  );
  const participateStatus = participatedList?.filter(
    (x) => x.postingId === postingId
  );
  const onClickApplicationModalHandler = () => {
    setApplicationModal(!applicationModal);
  };
  const onClickApplicateHandler = () => {
    if (!tokenValue) {
      alert("로그인 해주세요.");
      navigate("/login");
    } else {
      dispatch(__postApplication(postingId)).then(
        Swal.fire({
          text: getMsg,
          confirmButtonColor: "#FF5A5F",
        })
      );
      navigate(`../details/${postingId}`);
    }
  };
  const onClickCancelHandler = () => {
    Swal.fire({
      text: "참가를 취소하시겠습니까?",
      padding: "1rem 0",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonColor: "#FF5A5F",
      denyButtonColor: "#adadad",
      confirmButtonText: "참가 취소",
      denyButtonText: "돌아간다",
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          text: "참가 취소되었습니다.",
          confirmButtonColor: "#ff5a5f",
        });
        dispatch(__cancelApplication(postingId));
        navigate("/");
      } else if (res.isDenied) {
        return;
      }
    });
  };

  useEffect(() => {
    dispatch(__getParticipatedList(getMemberId)).then(
      dispatch(__getMyProfile())
    );
  }, [dispatch, getMemberId]);

  if (details?.doneStatus)
    return (
      <ElApplicationWrap>
        <ButtonBasic background="#adadad" color="white">
          <img src={applicateBtnIcon} alt="" /> 완료된 게시물입니다.
        </ButtonBasic>
      </ElApplicationWrap>
    );
  else if (details?.myPosting)
    return (
      <ElApplicationWrap>
        <>
          {applicationModal && (
            <DetailApplicationList
              postingId={postingId}
              onClickMoveProfileHandler={onClickMoveProfileHandler}
            />
          )}
          <ButtonBasic _onClick={onClickApplicationModalHandler}>
            <img src={applicateBtnIcon} alt="" /> 신청 리스트 보기
          </ButtonBasic>
        </>
      </ElApplicationWrap>
    );
  // 미로그인 상태이거나 참가중이지 않을 때
  if (!tokenValue || !participateStatus?.length)
    return (
      <ElApplicationWrap>
        <ButtonBasic _onClick={onClickApplicateHandler}>
          <img src={applicateBtnIcon} alt="" /> 참가 신청 하기
        </ButtonBasic>
      </ElApplicationWrap>
    );
  if (participateStatus?.length > 0)
    return (
      <ElApplicationWrap>
        <ButtonBasic _onClick={onClickCancelHandler} background="#939393">
          <MdOutlineCancel />
          &nbsp;참가 취소 하기
        </ButtonBasic>
      </ElApplicationWrap>
    );
};

export default DetailApplicationBtns;

const ElApplicationWrap = styled.div`
  position: relative;
  button {
    height: 3.125rem;
    margin: 1.875rem 0;
  }
  img {
    margin-right: 0.4rem;
  }
`;
