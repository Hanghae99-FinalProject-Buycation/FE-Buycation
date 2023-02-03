import React from "react";
import styled from "@emotion/styled";
import DetailSpan from "../elements/DetailSpan";
import participantFilled from "../../../assets/detailIcon/participantFilledIcon.svg";
import participantEmpty from "../../../assets/detailIcon/participantEmptyIcon.svg";
import { countComma } from "../../../utils/editedData";

const DetailApplicationBody = ({ details }) => {
  const subCount = Array.from(
    { length: details?.totalMembers - details?.currentMembers },
    (_, i) => i + 1
  );
  const currentCount = Array.from(
    { length: details?.currentMembers },
    (_, i) => i + 1
  );
  return (
    <ElDiv>
      <ElSpan>
        <span>모집인원</span>
        {details?.totalMembers < 11 ? (
          <span>
            {currentCount &&
              currentCount.map((x) => (
                <img key={x} src={participantFilled} alt="모집 됨" />
              ))}
            {subCount.length !== 0 &&
              subCount.map((y) => (
                <img key={y} src={participantEmpty} alt="빈 자리" />
              ))}
            <br />
            {details?.currentMembers}/{details?.totalMembers} 명 모집 완료
          </span>
        ) : (
          <span>
            <img src={participantFilled} alt="모집 됨" /> <br />
            {details?.currentMembers}/{details?.totalMembers} 명 모집 완료
          </span>
        )}
      </ElSpan>
      <DetailSpan
        titleText={"모집 기간"}
        bodyText={`${details?.createdAt} ~ ${details?.dueDate} 까지`}
      />

      <DetailSpan
        titleText={"총 공구 금액"}
        bodyText={countComma(details?.budget)}
      />
      <DetailSpan
        titleText={"1인당 예상 금액"}
        bodyText={countComma(details?.perBudget)}
        fontSize="1.313rem"
        fontWeight="600"
      />
    </ElDiv>
  );
};

export default DetailApplicationBody;

const ElDiv = styled.div`
  span {
    margin-bottom: ${({ theme }) => theme.lineHeight.perParagraph};
  }
`;

const ElSpan = styled.div`
  display: flex;
  flex-direction: column;
  span:first-of-type {
    display: inline-block;
    margin: ${({ margin }) => (margin ? margin : "0 0 16px")};
  }
  span:last-of-type {
    font-size: ${({ fontSize }) => fontSize};
    font-weight: ${({ fontWeight }) => fontWeight};
    color: ${({ color }) => color};
  }
  img {
    margin: 0 0.1rem 0.5rem 0;
  }
`;
