import React from "react";
import cloudIcon from ".././assets/icon/cloud.svg";

type Props = {};

const TopIcon = () => {
  return (
    <img
      src={cloudIcon}
      alt="구름 아이콘"
      style={{ width: "30px", alignSelf: "flex-end" }}
    />
  );
};

export default TopIcon;
