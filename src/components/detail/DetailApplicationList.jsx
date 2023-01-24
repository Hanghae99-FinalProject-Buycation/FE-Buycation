import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import { RxCross1 } from "react-icons/rx";
import ButtonBasic from "../elements/ButtonBasic";
import DetailSpan from "../detail/elements/DetailSpan";
import {
  __allowApplication,
  __denyApplication,
  __getApplication,
} from "../../redux/modules/application/applicationSlice";
import profileDefault from "../../assets/profileImg/profile_default.svg";
import footIcon from "../../assets/reviewIcon/reviewFootIcon.svg";

const DetailApplicationList = ({ postingId, onClickMoveProfileHandler }) => {
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);
  const onClickCloseHandler = () => {
    setHide(!hide);
  };
  // 더블클릭 해야 다시 버튼 등장함...
  const ref = useOutsideClick(onClickCloseHandler);
  // const applicateStatus = applicationList.data;
  const applicateStatus = useSelector(
    (state) => state.applicate.getApplication
  );
  const onClickAllowApplicationHandler = (item) => {
    dispatch(
      __allowApplication({
        applicationId: item.applicationId,
        postingId: postingId,
      })
    );
  };
  const onClickDenyApplicationHandler = (item) => {
    dispatch(
      __denyApplication({
        applicationId: item.applicationId,
        postingId: postingId,
      })
    );
  };

  useEffect(() => {
    dispatch(__getApplication(postingId));
  }, [dispatch, postingId]);
  return (
    !hide && (
      <StApplicationList ref={ref}>
        <div className="title">
          <span>신청자 리스트</span>
          <span>
            <RxCross1 onClick={onClickCloseHandler} />
          </span>
        </div>
        {applicateStatus &&
          applicateStatus?.map((item) => (
            <div key={"frag" + item.applicationId} className="wrap">
              {item?.profileImage ? (
                <img
                  src={item.profileImage}
                  className="profile"
                  alt=""
                  onClick={() => {
                    onClickMoveProfileHandler(item?.memberId);
                  }}
                />
              ) : (
                <img
                  src={profileDefault}
                  className="profile"
                  alt=""
                  onClick={() => {
                    onClickMoveProfileHandler(item?.memberId);
                  }}
                />
              )}
              <DetailSpan
                titleText={item.nickname}
                bodyText={
                  <>
                    <img className="btnWrap" src={footIcon} alt="" />
                    {item.userScore}
                    발자국
                  </>
                }
                margin="0"
                color="#a6a6a6"
                fontSize="10px"
                _onClick={() => onClickMoveProfileHandler(item?.memberId)}
              />
              <ButtonBasic
                _onClick={() => {
                  onClickDenyApplicationHandler(item);
                }}
              >
                거절
              </ButtonBasic>
              <ButtonBasic
                _onClick={() => {
                  onClickAllowApplicationHandler(item);
                }}
              >
                수락
              </ButtonBasic>
            </div>
          ))}
      </StApplicationList>
    )
  );
};

export default DetailApplicationList;

const StApplicationList = styled.div`
  width: 20.25rem;
  height: 14rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 10%;
  bottom: 4rem;
  z-index: 5;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 1px 2px ${({ theme }) => theme.colors.grayList};
  background: #fff;

  .title {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.grayList};
    span {
      font-size: ${({ theme }) => theme.fontSize.md};
      font-weight: 600;
    }
  }

  .wrap {
    display: grid;
    grid-template-columns: auto 1fr auto auto auto;
    grid-template-rows: 3.5rem;
    align-items: center;
    padding: 0 0.75rem 0;
    height: fit-content;
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.grayList};
    font-size: ${({ theme }) => theme.fontSize.sm};

    .profile {
      width: 2rem;
      height: 2rem;
      object-fit: cover;
      border-radius: 5rem;
      border: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
      cursor: pointer;
    }

    span {
      display: inline-block;
      cursor: pointer;

      /* padding: 0 0.5rem; */
    }
    /* && :first-of-type {
      border-bottom: 0.1rem solid ${({ theme }) => theme.colors.grayList};
    } */
  }

  .btnWrap {
    width: 1rem;
    height: 1rem;
    margin: 0;
  }
  button {
    width: 2.5rem;
    height: 1.5rem;
    background: #fff;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: 100;
  }
  button:first-of-type {
    border: 0.1rem solid ${({ theme }) => theme.colors.grayWeak};
    color: ${({ theme }) => theme.colors.grayWeak};
    margin-right: 0.2rem;
  }
  button:last-of-type {
    border: 0.1rem solid ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.main};
  }
`;
