import styled from "@emotion/styled";
import React, { useEffect } from "react";

//함수형 컴포넌트에서는 kakao script를 인지하지 못함
//따라서 아래와 같이 스트립트는 window 전역 객체에 들어가 있기 떄문에 window에서 객체를 뽑아서 사용
const { kakao } = window;

const useMap = (address) => {
  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(33.499597, 126.531254), // 지도의 중심좌표
      lever: 3, // 지도의 확대 레벨
    };

    //지도 생성
    const kakao_map = new kakao.maps.Map(container, options);

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.Marker({
          map: kakao_map,
          position: coords,
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="display: block;
          background: #50627F;
          color: #fff;
          text-align: center;
          height: 2rem;
          border-radius:0.5rem;
          padding:0.5rem;" class="info-title">거래 장소</div>`,
          map: kakao_map,
          position: coords,
        });
        infowindow.open(kakao_map, marker);
        // 인포윈도우로 장소에 대한 설명을 표시합니다
        // 커스텀 오버레이에 표시할 내용입니다
        // HTML 문자열 또는 Dom Element 입니다
        // const content = `<div style="border:none !important; background:white; height:1.5rem; border-radius:0.5rem;">거래장소</div>`;

        // 커스텀 오버레이가 표시될 위치입니다
        // const position = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 커스텀 오버레이를 생성합니다
        // const customOverlay = new kakao.maps.CustomOverlay({
        //   position: position,
        //   content: content,
        // });

        // 커스텀 오버레이를 지도에 표시합니다
        // customOverlay.setMap(kakao_map);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        kakao_map.setCenter(coords);

        const infoTitle = document.querySelectorAll(".info-title");
        infoTitle.forEach(function (e) {
          const w = e.offsetWidth + 10;
          const ml = w / 2;
          e.parentElement.style.top = "-2rem";
          e.parentElement.style.left = "50%";
          e.parentElement.style.marginLeft = -ml + "px";
          e.parentElement.style.width = w + "px";
          e.parentElement.previousSibling.style.display = "none";
          e.parentElement.parentElement.style.border = "none";
          e.parentElement.parentElement.style.background = "unset";
        });
      }
    });
  }, []);
};

export default useMap;
