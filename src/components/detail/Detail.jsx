import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { __getDetail } from "../../redux/modules/details/detailSlice";
import { __postApplication } from "../../redux/modules/application/applicationSlice";
import { RiMapPin2Fill } from "react-icons/ri";
import applicateBtnIcon from "../../assets/detailIcon/applicateBtnIcon.svg";

import ButtonBasic from "../elements/ButtonBasic";
import { Spinners } from "../../shared/layout/Spinners";

import useBuyLocation from "../../hooks/useBuyLocation";
import DetailSpan from "./elements/DetailSpan";
import DetailMoreButton from "./elements/DetailMoreButton";
import DetailPostingOptionModal from "./modals/DetailPostingOptionModal";
import DetailCommentModal from "./modals/DetailCommentModal";
import DetailApplicationList from "./DetailApplicationList";
import DetailCommentForm from "./DetailCommentForm";
import DetailApplicationBody from "./DetailApplicationBody";
import { getCookies } from "../../core/cookie";
import { __getComment } from "../../redux/modules/details/commentSlice";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postingId = parseInt(useParams().postingId);
  const details = useSelector((state) => state.getDetail.getDetail);
  /*   const { isLoading, error } = useSelector(
    (state) => state.getDetail.getDetail
  ); */
  const [postingModal, setPostingModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [applicationModal, setApplicationModal] = useState(false);
  const token = getCookies("id");
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

  useBuyLocation(details?.address);

  useEffect(() => {
    dispatch(__getDetail(postingId));
  }, [dispatch, details.commentList]);

  // if (isLoading) return <Spinners />;
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
            <DetailSpan
              titleText={details.nickname}
              bodyText={details.address?.split(" ", 3).join(" ")}
            />
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
            <u>{details.category}</u> {details.createdAt?.split(" ")[0]}
          </span>
          <p>{details.content}</p>
        </StContent>
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
        {/*         {details.doneStatus && 
        '완료된 게시글입니다'
        } */}
        <ElApplicationWrap>
          {details.myPosting ? (
            <>
              {applicationModal && (
                <DetailApplicationList postingId={postingId} />
              )}
              <ButtonBasic _onClick={onClickApplicationModalHandler}>
                <img src={applicateBtnIcon} alt="" /> 신청 리스트 보기
              </ButtonBasic>
            </>
          ) : (
            <ButtonBasic _onClick={onClickApplicateHandler}>
              <img src={applicateBtnIcon} alt="" /> 참가 신청 하기
            </ButtonBasic>
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
                  <span>{comment.createdAt?.split(" ", 1)}</span>
                  <p>{comment.content}</p>
                </span>
                {token && (
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
    max-width: 57.5rem;
    border-top: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
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
    height: 31.625rem;
    object-fit: cover;
    border-radius: 0.5rem;
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
  span:first-of-type {
    margin: 0 0 0.5rem;
  }
  span:nth-of-type(2) {
    color: ${({ theme }) => theme.colors.grayStrong};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
  /* 프로필 이미지 래퍼 */
  .profileWrap {
    width: 3.725rem;
    height: 3.725rem;
    ${({ theme }) => theme.common.flexCenter}
    margin-right: 0.625rem;
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
  /* line-height: ${({ theme }) => theme.lineHeight.perParagraph}; */
  h3 {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.lineHeight.perParagraph};
  }
  span {
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-bottom: ${({ theme }) => theme.lineHeight.perParagraph};
    color: ${({ theme }) => theme.colors.grayMid};
  }

  p {
    line-height: ${({ theme }) => theme.lineHeight.perParagraph};
  }
`;

const StBuyLocation = styled.div`
  width: 100%;
  height: 18.725rem;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
`;

const ElApplicationWrap = styled.div`
  position: relative;
  button {
    height: 3.125rem;
    margin: 1.875rem 0;
    background: #ff5a5f;
    color: white;
  }
  img {
    margin-right: 0.4rem;
  }
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
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
  span > span:first-of-type {
    display: inline-block;
    margin-bottom: ${({ theme }) => theme.lineHeight.perSpan};
    font-weight: 700;
  }
  span > span:nth-of-type(2) {
    color: ${({ theme }) => theme.colors.grayMid};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }

  .commentOption {
    position: relative;
  }
`;
