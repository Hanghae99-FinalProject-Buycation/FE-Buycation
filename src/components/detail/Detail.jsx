import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { FaUserCircle } from "react-icons/fa";
import { RiMore2Line } from "react-icons/ri";
import { __getDetail } from "../../redux/modules/detailSlice";
import detail from "../../db/detailDB.json";

import ButtonBasic from "../elements/ButtonBasic";
import InputBasic from "../elements/InputBasic";
import DetailParagraph from "./DetailParagraph";

import useBuyLocation from "../../hooks/useBuyLocation";
import useWindowResize from "../../hooks/useWindowResize";
import DetailSpan from "./DetailSpan";

const Detail = () => {
  const dispatch = useDispatch();
  // const details = useSelector((state) => state.getDetail.getDetail);
  const details = detail.data;
  useBuyLocation(details.address);
  // const { getDetail, isLoading, error } = useSelector(
  // (state) => state.getDetail.getDetail
  // );
  useEffect(() => {
    // param 값?
    dispatch(__getDetail(1));
  }, [dispatch]);
  const size = useWindowResize();

  // if (isLoading) return <div>로딩ㅜㅜ</div>;

  // if (error) return <div>{error.msg}</div>;

  return (
    <StDetailWrap>
      <StDetailForm>
        <ElImgWrap />
        <StCreatorProfile>
          <div>
            {/* 프로필 이미지 */}
            <div></div>
            {/* 유저 정보 */}
            <DetailParagraph
              spanText={details.nickname}
              paraText={details.address}
            />
            {/* {details.address.split(" ", 2)} */}
          </div>
          <RiMore2Line
            size="1.875rem"
            alt="더보기 버튼, 수정삭제 모달 / 글쓴이 발자국 수"
            onClick={() => {}}
          />
        </StCreatorProfile>
        <hr />
        <StContent>
          <h3>{details.title}</h3>
          <span>
            {details.category === "food" ? "음식" : "물건"} {details.createdAt}
          </span>
          <p>{details.content}</p>
        </StContent>
        <hr />
        <StApplication>
          <DetailSpan
            titleText={"모집 인원"}
            bodyText={
              `${(<FaUserCircle />)}`.repeat(details.currentMembers) +
              "⭕".repeat(details.totalMembers - details.currentMembers)
            }
          />
          <DetailSpan
            titleText={"모집 기간"}
            bodyText={`~${details.dueDate}`}
          />
          <DetailSpan titleText={"전체 금액"} bodyText={details.budget} />
          <DetailSpan
            titleText={"1인당 예상금액"}
            bodyText={details.perBudget}
            fontSize="10rem"
          />
        </StApplication>
        <hr />
        <StBuyLocation id="map">🔻{details.address}</StBuyLocation>
        <hr />

        {localStorage.getItem("id") ? (
          <ElApplicationBtn
            height="3.125rem"
            margin="1.875rem 0"
            background="#FF5A5F"
            color="white"
          >
            신청 리스트 보기
          </ElApplicationBtn>
        ) : (
          <ElApplicationBtn
            type="submit"
            height="3.125rem"
            margin="1.875rem 0"
            background="#FF5A5F"
            color="white"
          >
            참가 신청 하기
          </ElApplicationBtn>
        )}
        <StComments>
          {/* <span>댓글 {details.comments}</span> */}
          <span>댓글 {details.comments.length}</span>
          <div>
            {size.innerWidth > 375 ? (
              <>
                <span>내 닉네임</span>
                <textarea placeholder="댓글을 남겨보세요" />
              </>
            ) : (
              <InputBasic placeholder="댓글을 남겨보세요" />
            )}
            <div>
              <ButtonBasic
                width="4.375rem"
                height="fit-content"
                background="#FF5A5F"
                color="white"
              >
                작성
              </ButtonBasic>
            </div>
          </div>
          {details.comments.map((comment, idx) => (
            <Fragment key={"frag" + idx}>
              <div key={comment.nickname[0] + idx}>
                <span>
                  {comment.nickname} / {comment.createdAt.split(" ", 1)}
                  <br />
                  {comment.content}
                </span>
                <RiMore2Line
                  size="1.875rem"
                  alt="수정삭제 버튼"
                  onClick={() => {}}
                />
              </div>
              <hr key={"hr" + idx} />
            </Fragment>
          ))}
        </StComments>
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
    background: #d9d9d9;
    height: 1px;
    max-width: 57.5rem;
    border: 0;
  }

  @media screen and (max-width: 23.5rem) {
    div:first-of-type {
      margin-top: 0;
    }
    background: gray;
    padding: 0 1rem;
  }
`;

const StDetailForm = styled.form`
  max-width: 57.5rem;
  width: 100%;
  height: 100%;
  div {
    margin: 1.875rem 0;
  }
`;

const ElImgWrap = styled.div`
  height: 32rem;
  /* max-height: 100%; */
  /* background: no-repeat center/100% url({details.image}); */
  background: no-repeat center/100%
    url("https://upload.wikimedia.org/wikipedia/commons/2/20/Korean_fried_chicken_3_banban.jpg");
  background-size: cover;
`;

const StCreatorProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 5rem;
  div:first-of-type {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  /* 프로필 이미지 */
  div > div:first-of-type {
    width: 5rem;
    height: 5rem;
    margin-right: 1.25rem;
    border-radius: 5rem;
    /* background: no-repeat center/100% url({details.profileImage}); */
    background: no-repeat center/100%
      url("https://i.pinimg.com/originals/37/80/ef/3780efe711f929f635de995d3a97c34b.jpg");
    background-size: cover;
  }
`;

const StContent = styled.div`
  line-height: ${({ theme }) => theme.lineHeight.perDiv};
  h3 {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.lineHeight.perDiv};
  }
  span {
    display: inline-block;
    margin-bottom: ${({ theme }) => theme.lineHeight.perDiv};
    color: #a6a6a6;
  }

  p {
    line-height: ${({ theme }) => theme.lineHeight.perParagraph};
  }
`;

const StApplication = styled.div`
  span:last-child {
    /* font-size: larger; */
  }
`;

const StBuyLocation = styled.div`
  width: 100%;
  height: 18.725rem;
  border: 1px solid #eee;
  border-radius: 0.5rem;
`;

const ElApplicationBtn = styled(ButtonBasic)`
  height: 5.25rem;
`;

const StComments = styled.div`
  div:first-of-type {
    display: flex;
    flex-direction: column;
    background: #ededed;
    padding: 1rem;

    textarea {
      height: 8rem;
      padding: 1rem 0;
      border: none;
      background: #ededed;
      resize: none;
      outline: none;
    }
    /* 작성 버튼 오른정렬용 래퍼 */
    div {
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
  /* 댓글 카드 */
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button {
      cursor: pointer;
    }
  }
`;
