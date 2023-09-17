import React, { useContext, useEffect, useState } from "react";
import Navbar from "./UI/navbar/navbar";
import TestAPI from "./Share/TestAPI/TestAPI";
import { AuthContext } from "../context/context";
import TestService from "../API/TestService";
import { useFetching } from "../hooks/useFetching";
import FavoriteButtons from "./FavoriteButtons";
import { getRatingIdList } from "./utils/utils";
import StarIcons from "./StarsIcons";

const Rating = ({ maxItemCount, starIcons, size, extraClasses }) => {
  const { authUser, userDb, favoriteCategory } = useContext(AuthContext);
  const [ratingAnimeList, setRatingAnimeList] = useState({});

  const ratingIdList = userDb && userDb.anime ? getRatingIdList(userDb) : [];
  console.log(ratingIdList);

  if (!authUser) {
    return <div>Провет</div>;
  }

  return (
    <TestAPI
      maxItemCount={maxItemCount}
      anime={ratingIdList}
      starIcons={starIcons}
      size={size}
      extraClasses={extraClasses}
      // gtc={gtc}
      // padding={padding}
      // width={width}
      // height={height}
      // h4fs={h4fs}
      // h3fs={h3fs}
    />
  );
};

export default Rating;
