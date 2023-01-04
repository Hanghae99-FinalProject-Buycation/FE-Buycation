import React from "react";
import useMap from "../../hooks/useMap";

const Map = () => {
  useMap();

  return (
    //지도를 담기 위한 영역 만듦
    <div
      id="map"
      style={{ width: "500px", height: "400px", border: "1px solid black" }}
    ></div>
  );
};

export default Map;
