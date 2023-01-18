import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import styled from "@emotion/styled";
import { FaUserCircle } from "react-icons/fa";
import { __getDetail } from "../../redux/modules/details/detailSlice";
import { __postApplication } from "../../redux/modules/application/applicationSlice";

import ButtonBasic from "../elements/ButtonBasic";

import useBuyLocation from "../../hooks/useBuyLocation";
import DetailSpan from "./DetailSpan";
import DetailMoreButton from "./DetailMoreButton";
import DetailPostingOptionModal from "./DetailPostingOptionModal";
import DetailCommentModal from "./DetailCommentModal";
import DetailApplicationList from "./DetailApplicationList";
import { useNavigate, useParams } from "react-router-dom";
import { addressForm } from "../../utils/editedData";
import DetailCommentForm from "./DetailCommentForm";
import { sendModalStatus } from "../../redux/modules/modal/modalSlice";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postingId = parseInt(useParams().postingId);
  const details = useSelector((state) => state.getDetail.getDetail);
  const modalStatus = useSelector((state) => state.generalModal.toggleModal);
  const [postingModal, setPostingModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [applicationModal, setApplicationModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const token = cookies.id;
  const commentsLength = details.commentList?.length || 0;

  const onClickPostingModalHandler = () => {
    setPostingModal(!postingModal);
  };
  const onClickCommentModalHandler = (e) => {
    console.log(e.target.id);
    if (e.target.id === details.commentList.commentId) {
      setCommentModal(!commentModal);
    }
  };
  const onClickApplicationModalHandler = () => {
    setApplicationModal(!applicationModal);
  };
  const onClickApplicateHandler = () => {
    if (!token) {
      alert("로그인 해주세요.");
      navigate("/login");
    } else {
      dispatch(__postApplication({ postingId: postingId, token: token }));
    }
  };
  useBuyLocation(details.address);
  // const { getDetail, isLoading, error } = useSelector(
  // (state) => state.getDetail.getDetail
  // );
  useEffect(() => {
    dispatch(__getDetail(postingId));
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
            {postingModal && <DetailPostingOptionModal postingId={postingId} />}
            {details.myPosting && (
              <DetailMoreButton onClick={onClickPostingModalHandler} />
            )}
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
        {/*         {details.doneStatus && 
        '완료된 게시글입니다'
        } */}
        <ElApplicationWrap>
          {details.myPosting ? (
            <>
              {applicationModal && (
                <DetailApplicationList postingId={postingId} />
              )}
              <ElApplicationBtn _onClick={onClickApplicationModalHandler}>
                신청 리스트 보기
              </ElApplicationBtn>
            </>
          ) : (
            <ElApplicationBtn _onClick={onClickApplicateHandler}>
              참가 신청 하기
            </ElApplicationBtn>
          )}
        </ElApplicationWrap>
        <StCommentWrap>
          {commentsLength !== 0 ? (
            <span> 댓글 {commentsLength}</span>
          ) : (
            <span> 댓글 0</span>
          )}
          {token && <DetailCommentForm />}
        </StCommentWrap>
        {commentsLength !== 0 &&
          details.commentList?.map((comment, idx) => (
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
                {details.myPosting && (
                  <div className="commentOption">
                    {commentModal && (
                      <DetailCommentModal id={comment.commentId} />
                    )}
                    <DetailMoreButton
                      onClick={onClickCommentModalHandler}
                      id={comment.commentId}
                    />
                  </div>
                )}
              </div>
              <hr key={"hr" + idx} />
            </StCommentList>
          ))}
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
    height: 32rem;
    object-fit: cover;
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
    ${({ theme }) => theme.common.flexCenter}
    margin-right: 1.25rem;
    border-radius: 5rem;
    overflow: hidden;
    border: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
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
  button {
    height: 3.125rem;
    margin: 1.875rem 0;
    background: #ff5a5f;
    color: white;
  }
`;

const ElApplicationBtn = styled(ButtonBasic)`
  height: 5.25rem;
`;

const StCommentWrap = styled.div`
  margin-bottom: 2rem;
  div:first-of-type {
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.grayList};
    padding: 1rem;
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
