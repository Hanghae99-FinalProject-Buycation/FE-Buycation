import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { RiMore2Line } from "react-icons/ri";
import { __getDetail } from "../../redux/modules/detailSlice";

import ButtonBasic from "../elements/ButtonBasic";

import useBuyLocation from "../../hooks/useBuyLocation";
import useWindowResize from "../../hooks/useWindowResize";
import InputBasic from "../elements/InputBasic";

const Detail = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.getDetail.getDetail);
  useBuyLocation(details.address);
  // const { getDetail, isLoading, error } = useSelector(
  // (state) => state.getDetail.getDetail
  // );
  useEffect(() => {
    // param 값?
    dispatch(__getDetail(2));
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
            <div></div>
            <span>
              {details.nickname}
              <br />
              {/* {details.address.split(" ", 2)} */}
              {details.address}
            </span>
          </div>
          <RiMore2Line
            size="1.875rem"
            alt="더보기 버튼, 수정삭제 모달 / 글쓴이 발자국 수"
            onClick={() => {}}
          />
        </StCreatorProfile>
        <hr />
        <StContent>
          {details.title}
          <br />
          <p>
            {details.category === "food" ? "음식" : "물건"}{" "}
            {/* {details.createdAt.split(" ")[0]} */}
            {details.createdAt}
            <br />
            {details.content}
          </p>
        </StContent>
        <hr />
        <StApplication>
          모집인원
          <br />
          {"😀".repeat(details.currentMembers) +
            "⭕".repeat(details.totalMembers - details.currentMembers)}
          <br />
          모집기간
          <br />
          {`~${details.dueDate}`}
          <br />
          <div>
            <span>
              전체 금액 <br />
              {details.budget}
            </span>
            <span>
              1인당 예상금액 <br /> {details.perBudget}
            </span>
          </div>
        </StApplication>
        <hr />
        <StBuyLocation id="map">🔻{details.address}</StBuyLocation>
        <hr />
        <ElApplicationBtn type="submit" height="5.25rem" margin="1.875rem 0">
          분기: 참가신청 하기 또는 신청 리스트 보기...이거 모달?
        </ElApplicationBtn>
        <StComments>
          {/* <span>댓글 {details.comments.length}</span> */}
          <span>댓글 {details.comments}</span>
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
              <ButtonBasic type="button" width="4.375rem" height="fit-content">
                작성
              </ButtonBasic>
            </div>
          </div>
          {/*  {details.comments.map((comment, idx) => (
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
          ))} */}
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

  span,
  p {
    font-size: ${({ theme }) => theme.fontSize.md};
  }

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
  max-height: 32rem;
  background: no-repeat center/100% url({details.image});
  background-size: cover;
`;

const StCreatorProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 5rem;
  line-height: 1.5rem;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  /* 프로필 이미지 */
  div > div {
    width: 5rem;
    height: 5rem;
    margin-right: 1.25rem;
    border-radius: 5rem;
    background: no-repeat center/100% url({details.profileImage});
    background-size: cover;
  }
`;

const StContent = styled.div``;

const StApplication = styled.div`
  div {
    display: flex;
    flex-direction: row;
    span {
      margin-right: 1rem;
    }
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
