import React from "react";
import styled from "@emotion/styled";
import { category } from "../main/option";
import InputBasic from "../elements/InputBasic";
import ButtonBasic from "../elements/ButtonBasic";

const Posting = () => {
  const categoryList = category();
  return (
    <Container>
      <p>공구 글쓰기</p>
      <hr />

      <PostingForm>
        <TextInputForm>
          <SelectInput>
            {categoryList.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </SelectInput>
          <InputBasic placeholder="제목을 입력해 주세요." />
          <TextArea placeholder="내용을 입력해 주세요."></TextArea>
          <LabelFlex>
            <p>사진 첨부</p>
            <InputBasic width="35%" type="file" placeholder="파일명" />
            <span>첨부 파일은 최대 1장 등록 가능합니다.</span>
          </LabelFlex>
          <LabelFlex>
            <p>거래 희망 주소</p>
            <InputBasic
              width="35%"
              placeholder="이웃과 거래하고 싶은 장소를 선택해 주세요."
            />
          </LabelFlex>
          <LabelFlex>
            <p>상세주소</p>
            <InputBasic width="56%" />
          </LabelFlex>
        </TextInputForm>

        <SubmitForm>
          <SelectInputForm>
            <label>모집 인원</label>
            <InputBasic type="number" />
            <label>모집 마감일 선택</label>
            <InputBasic type="date" />
            <label>모집 마감 시간 선택</label>
            <InputBasic type="time" />
            <label>
              결제 정보 <br />
              <span>공구하려는 물품의 금액을 입력해주세요.</span>
            </label>
            <InputBasic type="number" />
            <p>
              1인당 결제 금액 <span>25,000원</span>
            </p>
          </SelectInputForm>

          <ButtonForm>
            <ButtonBasic>등록</ButtonBasic>
            <ButtonBasic>닫기</ButtonBasic>
          </ButtonForm>
        </SubmitForm>
      </PostingForm>
    </Container>
  );
};

export default Posting;

const Container = styled.div`
  height: 100%;
  padding: 1.5rem;
`;

const PostingForm = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: 72% 26%;
  gap: 2%;

  @media screen and (max-width: 990px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
  }
`;

const TextInputForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 15rem;
  padding: 1rem;
`;

const SelectInput = styled.select`
  width: 50%;
  height: 2.5rem;
  border: 1px solid #f5f5f5;
  border-radius: 0.5rem;
  background: #e7e7e7;
  padding: 0.5rem;
`;

const LabelFlex = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  & > p {
    width: 15%;
  }
`;

const SubmitForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const SelectInputForm = styled.div`
  background: #e7e7e7;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > P {
    border-top: 1px solid #888;
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  & > label > span {
    font-size: 13px;
  }
`;

const ButtonForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
