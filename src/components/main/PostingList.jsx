import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";
import PostingCard from "./PostingCard";
import EmptyCard from "./EmptyCard";
import { useDispatch, useSelector } from "react-redux";
import {
  __getPostingList,
  __getCoords,
} from "../../redux/modules/main/postingListSlice";
import { categoryList, sortList } from "../../utils/option";

const PostingList = () => {
  const dispatch = useDispatch();
  const postingList = useSelector((data) => data.getPostingList.getPostingList);

  const [searchValue, setSearchValue] = useState({
    search: "",
    category: "",
    sort: "",
  });

  useEffect(() => {
    dispatch(__getPostingList(searchValue));
  }, [dispatch, searchValue]);

  const onKeyupSearchHandler = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      const keyword = event.target.value;
      setSearchValue({ ...searchValue, search: keyword });
      dispatch(__getPostingList({ ...searchValue, search: keyword }));
    }
  };
  const onChangeCategoryHandler = (event) => {
    const categoryName = event.target.value;
    setSearchValue({ ...searchValue, category: categoryName });
    dispatch(__getPostingList({ ...searchValue, category: categoryName }));
  };
  const onChangeSortHandler = (event) => {
    const sortName = event.target.value;
    setSearchValue({ ...searchValue, sort: sortName });
    dispatch(__getPostingList({ ...searchValue, sort: sortName }));
  };

  //해당 게시글 클릭 시 좌표 값
  const onClickCardHandler = (coordsX, coordsY) => {
    const coords = {
      coordsX: coordsX,
      coordsY: coordsY,
    };
    dispatch(__getCoords(coords));
  };

  return (
    <Section>
      <SearchBox>
        <SearchKeyword>
          <FaSearch size="13px" color="#FF5A5F" />
          <input
            type="text"
            placeholder="장소, 거래 물품 검색"
            onKeyUp={(event) => onKeyupSearchHandler(event)}
          />
        </SearchKeyword>
        <SelectBox>
          <Select name="category" onChange={onChangeCategoryHandler}>
            {categoryList.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <Select name="sort" onChange={onChangeSortHandler}>
            {sortList.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </SelectBox>
      </SearchBox>
      {postingList.length === 0 ? (
        <EmptyCard />
      ) : (
        postingList.map((item) => (
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
            onShowMarker={() => onClickCardHandler(item.coordsX, item.coordsY)}
          />
        ))
      )}
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
  grid-area: "list";
  @media screen and (max-width: 768px) {
    border-top: 2px solid ${({ theme }) => theme.colors.grayStrong};
    border-radius: 12px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25), 0px 0px 12px rgba(0, 0, 0, 0.1);
  }
`;

const SearchBox = styled.header`
  width: 90%;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchKeyword = styled.div`
  width: 100%;
  height: 2.25rem;
  border: 1px solid ${({ theme }) => theme.colors.main};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 1rem;
  input {
    width: 100%;
    background: none;
  }
`;

const SelectBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 64% 34%;
  gap: 2%;
`;

const Select = styled.select`
  width: 100%;
  height: 2rem;
  padding: 0 0.6rem;
  border-radius: 11rem;
  border: 1px solid ${({ theme }) => theme.colors.grayStrong};
  color: ${({ theme }) => theme.colors.black};
`;
