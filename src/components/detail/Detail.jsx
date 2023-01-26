import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { __getDetail } from "../../redux/modules/details/detailSlice";
import { RiMapPin2Fill } from "react-icons/ri";

import DetailSpan from "./elements/DetailSpan";
import DetailMoreButton from "./elements/DetailMoreButton";
import DetailApplicationBody from "./DetailApplicationBody";
import { getCookies } from "../../core/cookie";
// import { longTitleForm, titleForm } from "../../utils/editedData";
import { Spinners } from "../../shared/layout/Spinners";
import useBuyLocation from "../../hooks/useBuyLocation";
import DetailApplicationBtns from "./DetailApplicationBtns";
import DetailCommentList from "./DetailCommentList";
import DetailCreatorProfile from "./DetailCreatorProfile";
import DetailContent from "./DetailContent";
import { __getMyProfile } from "../../redux/modules/profile/profileSlice";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenValue = getCookies("id");
  const postingId = parseInt(useParams().postingId);
  const { isLoading, error } = useSelector((state) => state.getDetail);
  const details = useSelector((state) => state.getDetail.getDetail);
  const isSuccess = useSelector((state) => state.comments.isSuccess);
  const { memberId } = useSelector((data) => data.profile.getProfile);

  const onClickMoveProfileHandler = (memberId) => {
    navigate(`/profile/${memberId}`);
  };

  useBuyLocation(details?.address);

  useEffect(() => {
    dispatch(__getDetail(postingId));
    dispatch(__getMyProfile());
  }, [dispatch, postingId, isSuccess]);

  if (isLoading) return <Spinners />;

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
              <RiMapPin2Fill /> {details?.address}
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
          memberId={memberId}
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
    /* border: 0.1rem solid ${({ theme }) => theme.colors.grayWeak}; */
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
