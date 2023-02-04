import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import Swal from "sweetalert2";
import ButtonBasic from "../../elements/ButtonBasic";
import DetailApplicationList from "./DetailApplicationList";
import {
  __cancelApplication,
  __postApplication,
} from "../../../redux/modules/application/applicationSlice";
import applicateBtnIcon from "../../../assets/detailIcon/applicateBtnIcon.svg";
import applicateCancelIcon from "../../../assets/detailIcon/applicateCancelIcon.svg";
import applicateCompleteIcon from "../../../assets/detailIcon/applicateCompleteIcon.svg";
import { __doneDetail } from "../../../redux/modules/details/detailSlice";

const DetailApplicationBtns = ({
  details,
  postingId,
  tokenValue,
  onClickMoveProfileHandler,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [applicationModal, setApplicationModal] = useState(false);

  const onClickApplicationModalHandler = () => {
    setApplicationModal(!applicationModal);
  };
  const onClickApplicateHandler = () => {
    if (!tokenValue) {
      Swal.fire({
        text: "로그인 해주세요.",
        confirmButtonColor: "#FF5A5F",
        confirmButtonText: "확인",
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
          confirmButtonText: "확인",
        })
      );
    }
  };
  const onClickApplicateAskHandler = () => {
    if (!tokenValue) {
      Swal.fire({
        text: "로그인 해주세요.",
        confirmButtonColor: "#FF5A5F",
        confirmButtonText: "확인",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      Swal.fire({
        text: "모집 인원이 찬 게시물입니다. 대기자로 등록하시겠습니까?",
        confirmButtonColor: "#FF5A5F",
        confirmButtonText: "등록",
        showDenyButton: true,
        denyButtonText: "취소",
        denyButtonColor: "#adadad",
      }).then((res) => {
        if (res.isConfirmed) dispatch(__postApplication(postingId));
        if (res.isDenied) return;
      });
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
          confirmButtonColor: "#FF5A5F",
          confirmButtonText: "확인",
        });
        dispatch(__cancelApplication(postingId)).then((res) => navigate("/"));
      } else if (res.isDenied) {
        return;
      }
    });
  };
  const onClickSendDoneHandler = () => {
    dispatch(__doneDetail(postingId)).then((res) => {
      if (res.payload.statusCode !== 200) {
        Swal.fire({
          text: res.payload.msg,
          confirmButtonColor: "#ff5f5a",
        });
      } else {
        Swal.fire({
          text: res.payload.msg,
          confirmButtonColor: "#ff5f5a",
        });
        navigate("/myProfile");
      }
    });
  };

  useEffect(() => {}, [dispatch]);

  return (
    <ElApplicationWrap>
      {details?.doneStatus && (
        <ButtonBasic background="#adadad" color="white">
          <img src={applicateBtnIcon} alt="" /> 완료된 게시물입니다.
        </ButtonBasic>
      )}

      {details?.myPosting &&
        details?.totalMembers > details?.currentMembers && (
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
        )}

      {details?.participant && !details?.myPosting && (
        <ButtonBasic _onClick={onClickCancelHandler} background="#939393">
          <img src={applicateCancelIcon} alt="" />
          참가 취소 하기
        </ButtonBasic>
      )}

      {details?.totalMembers === details?.currentMembers ? (
        details?.myPosting ? (
          <ButtonBasic _onClick={onClickSendDoneHandler}>
            <img src={applicateCompleteIcon} alt="" /> 모집 완료시 클릭!
          </ButtonBasic>
        ) : (
          !details?.participant && (
            <ButtonBasic
              background="#939393"
              _onClick={onClickApplicateAskHandler}
            >
              <img src={applicateCompleteIcon} alt="" /> 완료 대기중인
              게시물입니다.
            </ButtonBasic>
          )
        )
      ) : (
        (!tokenValue || !details?.participant) && (
          <ButtonBasic _onClick={onClickApplicateHandler}>
            <img src={applicateBtnIcon} alt="" /> 참가 신청 하기
          </ButtonBasic>
        )
      )}
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
