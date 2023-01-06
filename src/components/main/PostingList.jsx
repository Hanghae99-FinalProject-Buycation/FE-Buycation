import React from "react";
import { FaSearch } from "react-icons/fa";
import styled from "@emotion/styled";
import { category, sort } from "./option";
import PostingCard from "./PostingCard";

//더미 데이터 사용
import dummy from "../../db/mainDB.json";

const PostingList = () => {
  const categoryList = category();
  const sortList = sort();

  return (
    <Section>
      <header>
        <Search>
          <FaSearch />
          <input placeholder="장소, 거래 물품 검색" />
        </Search>
        <Category>
          <Select>
            {categoryList.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <Select>
            {sortList.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Category>
      </header>

      {dummy.data.map((item) => (
        <PostingCard
          key={item.postingId}
          postingId={item.postingId}
          category={item.category}
          address={item.address}
          title={item.title}
          totalMembers={item.totalMembers}
          currentMembers={item.currentMembers}
          dueData={item.dueDate}
          perBudget={item.perBudget}
          image={item.image}
        />
      ))}
    </Section>
  );
};

export default PostingList;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  grid-area: list;

  & > header {
    width: 90%;
    align-items: center;
    margin: 10px 0;
  }
`;

const Search = styled.div`
  width: 100%;
  height: 2.5rem;
  border: 1px solid #f5f5f5;
  border-radius: 0.5rem;
  background: #e7e7e7;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 1rem;
  & > input {
    width: 100%;
    background: none;
  }
`;

const Category = styled.div`
  display: grid;
  grid-template-columns: 65% 30%;
  gap: 5%;
  width: 100%;
  margin-top: 10px;
`;

const Select = styled.select`
  width: 100%;
  height: 2rem;
  padding: 4px;
  border-radius: 11rem;
  border: 1px solid #e7e7e7;
  background: #e7e7e7;
`;
