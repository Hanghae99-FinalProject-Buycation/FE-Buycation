import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";
import { categoryList, sortList } from "../../utils/option";
import PostingCard from "./PostingCard";
import { useDispatch, useSelector } from "react-redux";
import {
  __getPostingList,
  __getSearch,
  __getCoords,
} from "../../redux/modules/postingListSlice";
//더미 데이터 사용
import dummy from "../../db/mainDB.json";

const PostingList = () => {
  const nagivate = useNavigate();
  const dispatch = useDispatch();
  const postingList = useSelector((data) => data.getPostingList.getPostingList);
  //console.log(postingList);
  const [search, setSearch] = useState({
    search: "",
    category: "",
    sort: "",
  });

  useEffect(() => {
    dispatch(__getPostingList());
    dispatch(__getSearch());
  }, [dispatch]);

  const onKeyupSearchHandler = (event) => {
    if (event.key === "Enter") {
      const keyword = event.target.value;
      setSearch({ ...search, search: keyword });
      dispatch(__getSearch({ ...search, search: keyword }));
    }
  };
  const onChangeCategoryHandler = (event) => {
    const categoryName = event.target.value;
    setSearch({ ...search, category: categoryName });
    dispatch(__getSearch({ ...search, category: categoryName }));
  };
  const onChangeSortHandler = (event) => {
    const sortName = event.target.value;
    setSearch({ ...search, sort: sortName });
    dispatch(__getSearch({ ...search, sort: sortName }));
  };
  console.log("상태값 :", search);

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
          onShowMarker={() => onClickCardHandler(item.x, item.y)}
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
  grid-area: "list";
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
