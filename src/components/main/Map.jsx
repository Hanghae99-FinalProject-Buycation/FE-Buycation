import React from "react";
import useMap from "../../hooks/useMap";

const Map = () => {
  useMap();

  return (
    //id를 통해서 div태그를 읽음
    <div id="map" style={{ gridArea: "map" }}></div>
  );
};

export default Map;
