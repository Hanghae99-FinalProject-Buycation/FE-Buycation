import React, { useEffect } from "react";
import { useSelector } from "react-redux";
//더미 데이터 사용
import dummy from "../../db/mainDB.json";

const Map = () => {
  const onGetCoordsData = useSelector((data) => data.getPostingList.getCoords);
  const coordsX = Number(onGetCoordsData.coordsX);
  const coordsY = Number(onGetCoordsData.coordsY);

  //함수형 컴포넌트에서는 kakao script를 인지하지 못함
  //따라서 아래와 같이 스트립트는 window 전역 객체에 들어가 있기 때문에 window에서 객체를 뽑아서 사용
  const { kakao } = window;

  useEffect(() => {
    kakaoMap();
  }, [coordsX, coordsY]);

  const kakaoMap = () => {
    const container = document.getElementById("map"); //지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(dummy.data[3].y, dummy.data[3].x), //지도 중심좌표 (세팅:더큰내일센터)
      lever: 3, //지도 확대 레벨
    };
    //지도 생성
    const map = new kakao.maps.Map(container, options);

    dummy.data.forEach((el) => {
      const position = { latlng: new kakao.maps.LatLng(el.y, el.x) };
      //console.log("각 마커의 position", position);

      //결과 값으로 받은 위치를 마커로 표시
      const marker = new kakao.maps.Marker({
        map: map, //마커를 표시할 지도
        position: position.latlng, //마커를 표시할 위치
        title: el.title, //마커에 hover시 나타날 title
      });

      //지도의 중심을 결과값으로 받은 위치로 이동 : 중심좌표에서 클릭 한 좌표의 위치로 이동
      const coords = { latlng: new kakao.maps.LatLng(coordsY, coordsX) };
      //console.log("클릭한 게시글 좌표 coords", coords);
      if (isNaN(coordsX) === false && isNaN(coordsY) === false) {
        map.setCenter(coords.latlng);
      }
    });
  };

  return (
    //id를 통해서 div태그를 읽음
    <div id="map" style={{ gridArea: "map" }}></div>
  );
};

export default Map;
