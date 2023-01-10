import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styled from "@emotion/styled";
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
      let keyword = event.target.value;
      setSearch({ ...search, search: keyword });
      dispatch(
        __getSearch(
          search({
            ...search,
            search: keyword,
          })
        )
      );
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
    dispatch(__getSearch(search));
  };
  console.log(search);

  //게시글 카드 클릭 시 주소 좌표 구하기
  const onClickCardHandler = (coordsX, coordsY) => {
    const coords = {
      coordsX: coordsX,
      coordsY: coordsY,
    };
    dispatch(__getCoords(coords));
  };

  return (
    <Section>
      <header>
        <Search>
          <FaSearch />
          <input
            type="text"
            placeholder="장소, 거래 물품 검색"
            onKeyUp={(event) => onKeyupSearchHandler(event)}
          />
        </Search>
        <Category>
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
