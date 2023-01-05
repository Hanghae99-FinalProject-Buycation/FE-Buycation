import React, { Fragment } from "react";
import styled from "@emotion/styled";
import ButtonBasic from "../elements/ButtonBasic";
import dummy from "../../db/detailDB.json";
import useMap from "../../hooks/useMap";

const Detail = () => {
  useMap(33.450701, 126.570667);
  return (
    <StDetailWrap>
      <StDetailForm>
        <ElImgWrap />
        <StCreatorProfile>
          <div>
            {/* 프로필 이미지 어디서 가져오지......? */}
            <div></div>
            <span>
              {dummy.data.nickname}
              <br />
              {dummy.data.address.split(" ", 2)}
            </span>
          </div>
          <button>더보기 버튼, 수정삭제 모달 / 글쓴이 발자국 수</button>
        </StCreatorProfile>
        <hr />
        <StContent>
          {dummy.data.title}
          <br />
          {dummy.data.category === "food" ? "음식" : "물건"}{" "}
          {dummy.data.createdAt.split(" ")[0]}
          <br />
          {dummy.data.content}
        </StContent>
        <hr />
        <StApplication>
          모집인원
          <br />
          {"😀".repeat(dummy.data.currentMembers) +
            "⭕".repeat(dummy.data.totalMembers - dummy.data.currentMembers)}
          <br />
          모집기간
          <br />
          {`~${dummy.data.dueDate}`}
          <br />
          <div>
            <span>
              전체 금액 <br />
              {dummy.data.budget}
            </span>
            <span>
              1인당 예상금액 <br />{" "}
              {dummy.data.budget / dummy.data.totalMembers}
            </span>
          </div>
        </StApplication>
        <hr />
        <StBuyLocation>
          🔻{dummy.data.address}
          <div id="map">지도</div>
        </StBuyLocation>
        <hr />
        <ElApplicationBtn type="submit" height="5.25rem" margin="1.875rem 0">
          분기: 참가신청 하기 또는 신청 리스트 보기...이거 모달?
        </ElApplicationBtn>
        <StComments>
          <span>댓글 {dummy.data.comments.length}</span>
          <div>
            <span>내 닉네임</span>
            <textarea placeholder="댓글을 남겨보세요" />
            <div>
              <ButtonBasic type="button" width="4.375rem" height="fit-content">
                작성
              </ButtonBasic>
            </div>
          </div>
          {dummy.data.comments.map((comment, idx) => (
            <Fragment key={"frag" + idx}>
              <div key={comment.nickname[0] + idx}>
                <span>
                  {comment.nickname} / {comment.createdAt.split(" ", 1)}
                  <br />
                  {comment.content}
                </span>
                <button type="button">점 세개 수정삭제 버튼</button>
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
`;

const StDetailForm = styled.form`
  width: 57.5rem;
  height: 100%;
  margin: 1.875rem 0;
  div {
    margin: 1.875rem 0;
  }
`;

const ElImgWrap = styled.div`
  height: 32rem;
  background: no-repeat center/100% url(${dummy.data.image});
  background-size: cover;
`;

const StCreatorProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 5rem;
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
    background: no-repeat center/100%
      url("https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg");
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
  div {
    height: 18.725rem;
    border: 1px solid #eee;
    border-radius: 0.5rem;
  }
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
