import React, { useEffect } from "react";

//함수형 컴포넌트에서는 kakao script를 인지하지 못함
//따라서 아래와 같이 스트립트는 window 전역 객체에 들어가 있기 떄문에 window에서 객체를 뽑아서 사용
const { kakao } = window;

const useMap = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      lever: 3,
    };
    //지도 생성
    const kakao_map = new kakao.maps.Map(container, options);

    //마커 띄우기
    const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(kakao_map);
  }, []);
};

export default useMap;
