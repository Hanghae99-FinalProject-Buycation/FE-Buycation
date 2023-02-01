import { useEffect } from "react";
import markerMain from "../assets/mapMarker/markerMain.svg";
//함수형 컴포넌트에서는 kakao script를 인지하지 못함
//따라서 아래와 같이 스트립트는 window 전역 객체에 들어가 있기 떄문에 window에서 객체를 뽑아서 사용
const { kakao } = window;

const useBuyLocation = (address) => {
  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(33.499597, 126.531254), // 지도의 중심좌표
      lever: 3, // 지도의 확대 레벨
    };

    //지도 생성
    const kakao_map = new kakao.maps.Map(container, options);

    //미카 이미지 생성
    const imageSrc = `${markerMain}`,
      imageSize = new kakao.maps.Size(29, 42),
      imageOption = { offset: new kakao.maps.Point(14, 39) }; //마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

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
          title: "거래 장소",
          image: markerImage,
        });

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        kakao_map.setCenter(coords);
      }
    });
  }, [address]);
};

export default useBuyLocation;
