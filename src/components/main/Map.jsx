import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import markerMain from "../../assets/mapMarker/markerMain.svg";

const Map = () => {
  const postingList = useSelector((data) => data.getPostingList.getPostingList);

  //해당 게시글 클릭 시 좌표 값
  const onGetCoordsData = useSelector((data) => data.getPostingList.getCoords);
  const coordsY = Number(onGetCoordsData.coordsY);
  const coordsX = Number(onGetCoordsData.coordsX);

  useEffect(() => {
    kakaoMap();
  }, [coordsX, coordsY, postingList]);

  //함수형 컴포넌트에서는 kakao script를 인지하지 못함 window 전역 객체에 들어가 있기에 객체를 뽑아서 사용
  const { kakao } = window;

  const kakaoMap = () => {
    const container = document.getElementById("map"); //지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(
        postingList[0]?.coordsY || 33.450701,
        postingList[0]?.coordsX || 126.570667
      ), //지도 중심좌표 (최초: 카카오 본사 세팅)
      lever: 3, //지도 확대 레벨
    };

    //지도 생성
    const map = new kakao.maps.Map(container, options);

    postingList.forEach((el) => {
      const position = {
        latlng: new kakao.maps.LatLng(el.coordsY, el.coordsX),
      };
      //console.log("각 마커의 position", position);

      //미카 이미지 생성
      const imageSrc = `${markerMain}`,
        imageSize = new kakao.maps.Size(29, 42),
        imageOption = { offset: new kakao.maps.Point(14, 39) }; //마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      //결과 값으로 받은 위치를 마커로 표시
      new kakao.maps.Marker({
        map: map, //마커를 표시할 지도
        position: position.latlng, //마커를 표시할 위치
        title: el.title, //마커에 hover시 나타날 title
        image: markerImage,
      });

      //지도의 중심을 결과값으로 받은 위치로 이동 : 중심좌표에서 클릭 한 좌표의 위치로 이동
      const coords = { latlng: new kakao.maps.LatLng(coordsY, coordsX) };
      //console.log("클릭한 게시글 좌표 coords", coords);
      if (isNaN(coordsX) === false && isNaN(coordsY) === false) {
        map.setCenter(coords.latlng);
      }
    });
  };

  return <div id="map" style={{ gridArea: "map" }}></div>;
};

export default Map;
