import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import Swal from "sweetalert2";
import { RiMapPin2Fill } from "react-icons/ri";
import { getCookies } from "../../core/cookie";
import useBuyLocation from "../../hooks/useBuyLocation";
import { __getDetail } from "../../redux/modules/details/detailSlice";

import DetailSpan from "./elements/DetailSpan";
import DetailMoreButton from "./elements/DetailMoreButton";
import DetailApplicationBody from "./application/DetailApplicationBody";
import DetailApplicationBtns from "./application/DetailApplicationBtns";
import DetailCommentList from "./comments/DetailCommentList";
import DetailCreatorProfile from "./DetailCreatorProfile";
import DetailContent from "./DetailContent";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenValue = getCookies("id");
  const postingId = parseInt(useParams().postingId);
  const { error } = useSelector((state) => state.getDetail);
  const details = useSelector((state) => state.getDetail.getDetail);
  const isSuccess = useSelector((state) => state.comments.isSuccess);

  const onClickMoveProfileHandler = (memId) => {
    navigate(`/profile/${memId}`);
  };

  useBuyLocation(details?.address);

  useEffect(() => {
    dispatch(__getDetail(postingId)).then((res) => {
      if (res.payload === "POSTING_NOT_FOUND") {
        Swal.fire({
          text: "존재하지 않는 공구입니다.",
          confirmButtonColor: "#ff5f5a",
        });
        navigate("/");
      }
    });
  }, [dispatch, postingId, isSuccess]);

  if (error) return <div>{error.msg}</div>;
  return (
    <StDetailWrap>
      <StDetailForm>
        <ElImgWrap>
          <img src={details.image} alt="" />
        </ElImgWrap>
        <DetailCreatorProfile
          details={details}
          postingId={postingId}
          onClickMoveProfileHandler={onClickMoveProfileHandler}
          DetailSpan={DetailSpan}
          DetailMoreButton={DetailMoreButton}
        />
        <hr />
        <DetailContent details={details} />

        <hr />
        <DetailApplicationBody details={details} />
        <hr />
        {/* 거래 장소 지도 */}
        <DetailSpan
          titleText="거래 위치"
          bodyText={
            <>
              <RiMapPin2Fill /> {details?.address} {details?.addressDetail}
            </>
          }
        />
        <StBuyLocation id="map" />
        <hr />
        {/* 참가 버튼 */}
        <DetailApplicationBtns
          details={details}
          postingId={postingId}
          tokenValue={tokenValue}
          onClickMoveProfileHandler={onClickMoveProfileHandler}
        />

        <DetailCommentList
          details={details}
          tokenValue={tokenValue}
          DetailMoreButton={DetailMoreButton}
          memberId={details.memberId}
        />
      </StDetailForm>
    </StDetailWrap>
  );
};

export default Detail;

const StDetailWrap = styled.div`
  ${({ theme }) => theme.common.flexCenter}
  flex-direction: column;
  padding: 0 1rem;
  hr {
    max-width: 57.5rem;
    border-top: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
  }

  @media screen and (max-width: 23.5rem) {
    div:first-of-type {
      margin-top: 1.5rem;
    }
    padding: 0 1rem;
  }
`;

const StDetailForm = styled.form`
  max-width: 57.5rem;
  width: 100%;
  height: 100%;
  hr {
    margin: 1.875rem 0;
  }
`;

const ElImgWrap = styled.div`
  ${({ theme }) => theme.common.flexCenter}
  margin: 1.875rem 0;
  img {
    width: 100%;
    height: 31.625rem;
    object-fit: cover;
    border-radius: 0.5rem;

    @media screen and (max-width: 48rem) {
      height: 25rem;
    }

    @media screen and (max-width: 23.5rem) {
      height: 18.75rem;
    }
  }
`;

const StBuyLocation = styled.div`
  width: 100%;
  height: 18.725rem;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  margin-top: 0.5rem;

  @media screen and (max-width: 23.5rem) {
    height: 9.5rem;
  }
`;
