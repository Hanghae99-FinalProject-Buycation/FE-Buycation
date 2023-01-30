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
import { __getParticipatedList } from "../../redux/modules/profile/myListSlice";
import applicateBtnIcon from "../../assets/detailIcon/applicateBtnIcon.svg";
import applicateCancelIcon from "../../assets/detailIcon/applicateCancelIcon.svg";

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

  const onClickApplicationModalHandler = () => {
    setApplicationModal(!applicationModal);
  };
  const onClickApplicateHandler = () => {
    if (!tokenValue) {
      Swal.fire({
        text: "로그인 해주세요.",
        confirmButtonColor: "#FF5A5F",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      dispatch(__postApplication(postingId)).then((res) =>
        Swal.fire({
          text: res.payload,
          confirmButtonColor: "#FF5A5F",
        })
      );
    }
  };
  const onClickCancelHandler = () => {
    Swal.fire({
      text: "참가를 취소하시겠습니까?",
      padding: "1rem 0",
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
        dispatch(__cancelApplication(postingId)).then((res) => navigate("/"));
      } else if (res.isDenied) {
        return;
      }
    });
  };

  useEffect(() => {}, [dispatch, getMsg]);

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
  if (!tokenValue || !details?.participant)
    return (
      <ElApplicationWrap>
        <ButtonBasic _onClick={onClickApplicateHandler}>
          <img src={applicateBtnIcon} alt="" /> 참가 신청 하기
        </ButtonBasic>
      </ElApplicationWrap>
    );
  if (details?.participant)
    return (
      <ElApplicationWrap>
        <ButtonBasic _onClick={onClickCancelHandler} background="#939393">
          <img src={applicateCancelIcon} alt="" />
          참가 취소 하기
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
