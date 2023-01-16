import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { FaUserCircle } from "react-icons/fa";
import {
  __getDetail,
  __postApplication,
} from "../../redux/modules/details/detailSlice";

import ButtonBasic from "../elements/ButtonBasic";
import InputBasic from "../elements/InputBasic";

import useBuyLocation from "../../hooks/useBuyLocation";
import useWindowResize from "../../hooks/useWindowResize";
import DetailSpan from "./DetailSpan";
import DetailParagraph from "./DetailParagraph";
import DetailMoreButton from "./DetailMoreButton";
import DetailPostingOptionModal from "./DetailPostingOptionModal";
import DetailCommentModal from "./DetailCommentModal";
import DetailApplicationList from "./DetailApplicationList";
import { useParams } from "react-router-dom";
import { addressForm } from "../../utils/editedData";

const Detail = () => {
  const dispatch = useDispatch();
  const param = parseInt(useParams().postingId);
  const details = useSelector((state) => state.getDetail.getDetail);
  const getMemberId = parseInt(localStorage.getItem("memberId"));
  // const editedAddress = addressForm(details.address);
  const [postingModal, setPostingModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [applicationModal, setApplicationModal] = useState(false);
  const onClickPostingModalHandler = () => {
    setPostingModal(!postingModal);
  };
  const onClickCommentModalHandler = () => {
    setCommentModal(!commentModal);
  };
  const onClickApplicationModalHandler = () => {
    setApplicationModal(!applicationModal);
  };
  const onClickApplicateHandler = () => {
    dispatch(__postApplication({ postingId: param, memberId: getMemberId }));
  };
  useBuyLocation(details.address);
  // const { getDetail, isLoading, error } = useSelector(
  // (state) => state.getDetail.getDetail
  // );
  const { innerWidth } = useWindowResize();
  useEffect(() => {
    dispatch(__getDetail(param));
  }, [dispatch]);

  // if (isLoading) return <div>로딩ㅜㅜ</div>;

  // if (error) return <div>{error.msg}</div>;
  return (
    <StDetailWrap>
      <StDetailForm>
        <ElImgWrap>
          <img src={details.image} alt="" />
        </ElImgWrap>
        <StCreatorProfile>
          <div>
            {/* 프로필 이미지 */}
            <div className="profileWrap">
              <img src={details.profileImage} alt="" />
            </div>
            {/* 유저 정보 */}
            {details.addressDetail ? (
              <DetailSpan
                titleText={details.nickname}
                bodyText={details.address + details.addressDetail}
              />
            ) : (
              <DetailSpan
                titleText={details.nickname}
                // bodyText={editedAddress}
                bodyText={details.address}
              />
            )}

            {/* {details.address.split(" ", 2)} */}
          </div>
          <div className="postingOption">
            {postingModal && <DetailPostingOptionModal postingId={param} />}
            <DetailMoreButton onClick={onClickPostingModalHandler} />
          </div>
        </StCreatorProfile>
        <hr />
        <StContent>
          <h3>{details.title}</h3>
          <span>
            {details.category} {details.createdAt}
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
        {/* 나중에 닉네임 같은 걸로 분기 수정 */}
        {getMemberId === details.memberId ? (
          <ElApplicationWrap>
            {applicationModal && <DetailApplicationList postingId={param} />}
            <ElApplicationBtn
              height="3.125rem"
              margin="1.875rem 0"
              background="#FF5A5F"
              color="white"
              _onClick={onClickApplicationModalHandler}
            >
              신청 리스트 보기
            </ElApplicationBtn>
          </ElApplicationWrap>
        ) : (
          <ElApplicationWrap>
            <ElApplicationBtn
              // type="submit"
              type="button"
              height="3.125rem"
              margin="1.875rem 0"
              background="#FF5A5F"
              color="white"
              _onClick={onClickApplicateHandler}
            >
              참가 신청 하기
            </ElApplicationBtn>
          </ElApplicationWrap>
        )}
        <StComment>
          {details.comment ? (
            <span>댓글 {details.comments.length}</span>
          ) : (
            <span>댓글 0</span>
          )}
          {localStorage.getItem("memberId") ? (
            <div>
              {innerWidth > 375 ? (
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
                  color="white"
                >
                  등록
                </ButtonBasic>
              </div>
            </div>
          ) : null}
        </StComment>
        {details.comments ? (
          details.comments.map((comment, idx) => (
            <StCommentList key={comment.nickname[0] + idx}>
              <div>
                <span>
                  <span>
                    {comment.nickname}
                    &nbsp;&nbsp;&nbsp;
                  </span>
                  <span>{comment.createdAt.split(" ", 1)}</span>
                  <p>{comment.content}</p>
                </span>
                {comment.nickname === details.nickname ? (
                  <div className="commentOption">
                    {commentModal && <DetailCommentModal />}
                    <DetailMoreButton onClick={onClickCommentModalHandler} />
                  </div>
                ) : null}
              </div>
              <hr key={"hr" + idx} />
            </StCommentList>
          ))
        ) : (
          <div></div>
        )}
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
    background: ${({ theme }) => theme.colors.grayWeak};
    height: 0.1rem;
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
  hr {
    margin: 1.875rem 0;
  }
`;

const ElImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32rem;
  margin: 1.875rem 0;
  img {
    flex-shrink: 0;
    /* min-width: 100%; */
    min-height: 100%;
  }
`;

const StCreatorProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  div:first-of-type {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  /* 프로필 이미지 래퍼 */
  .profileWrap {
    width: 3.725rem;
    height: 3.725rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1.25rem;
    border-radius: 5rem;
    overflow: hidden;
  }

  /* 프로필 이미지 */
  .profileWrap img {
    flex-shrink: 0;
    width: 100%;
    min-height: 100%;
  }

  .postingOption {
    position: relative;
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

const ElApplicationWrap = styled.div`
  position: relative;
`;

const ElApplicationBtn = styled(ButtonBasic)`
  height: 5.25rem;
`;

const StComment = styled.div`
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
`;

const StCommentList = styled.div`
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  span > span {
    display: inline-block;
    margin-bottom: ${({ theme }) => theme.lineHeight.perSpan};
  }

  span > span:nth-of-type(2) {
    color: ${({ theme }) => theme.colors.grayMid};
  }

  .commentOption {
    position: relative;
  }
`;
