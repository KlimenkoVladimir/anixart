import React, { useContext, useEffect, useState } from "react";
import { AuthContext, OptionContext } from "../context/context";
import Squares from "./UI/squares/Squares";
import { getWatchIdList } from "./utils/utils";
import DiskChart from "./DiskChart";

const ProfileStatistic = () => {
  const { userDb, statusLabels, color } = useContext(AuthContext);

  const statusNum = [];

  if (userDb && userDb.anime) {
    statusLabels.forEach((status) => {
      const watchIdList = getWatchIdList(userDb, status);
      statusNum.push(watchIdList.length);
    });
  }

  console.log(statusNum);

  return (
    <div className="profile-statistic">
      <Squares
        extraClasses={true}
        width={"100%"}
        padding={"5px"}
        num={statusNum}
      />
      <DiskChart num={statusNum} />
    </div>
  );
};

export default ProfileStatistic;
