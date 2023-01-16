import React from 'react';
import useWindowResize from '../../hooks/useWindowResize'

const DetailCommentForm = () => {
  const { innerWidth } = useWindowResize();

  if(localStorage.getItem('memberId')) return 
  <div>
  {innerWidth > 375 ? (<>
<span>내 닉네임</span>
<textarea placeholder="댓글을 남겨보세요" />
</>): 
(<>
<InputBasic placeholder="댓글을 남겨보세요" />)
          <ButtonBasic
            width="4.375rem"
            height="fit-content"
            color="white"
          >
            등록
          </ButtonBasic></>}
  </div>
  

export default DetailCommentForm;