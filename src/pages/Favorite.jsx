import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/UI/navbar/navbar";
import TestAPI from "../components/Share/TestAPI/TestAPI";
import { AuthContext } from "../context/context";
import TestService from "../API/TestService";
import { useFetching } from "../hooks/useFetching";
import FavoriteButtons from "../components/FavoriteButtons";
import { getWatchIdList } from "../components/utils/utils";
import Rating from "../components/Rating";

const Favorite = () => {
  const { authUser, userDb, favoriteCategory } = useContext(AuthContext);

  const watchIdList =
    userDb && userDb.anime ? getWatchIdList(userDb, favoriteCategory) : [];
  console.log(watchIdList, favoriteCategory);

  // const [fetchAnimeById, isAnimeLoadingById, animeErrorById] = useFetching(async (watchIdList) => {
  //     const responseArray = await Promise.all(watchIdList.map(async id => {
  //         const response = await TestService.getAnimeById(id);
  //         return response.data;
  //     }));

  //     setWatchAnimeList(responseArray.map(item => item.data));
  // });

  // useEffect(() => {
  //     fetchAnimeById(watchIdList)
  // }, [favoriteCategory, userDb])

  if (!authUser) {
    // Возвращаем что-то, если пользователь не авторизован
    return (
      <div>
        <Navbar buttonContent={<FavoriteButtons />} />
        <h5 style={{ marginTop: "30vh", textAlign: "center" }}>
          Необходим вход
        </h5>
      </div>
    );
  }

  return favoriteCategory === "Оценки" ? (
    <div>
      <Navbar buttonContent={<FavoriteButtons />} />
      <Rating starIcons={true} maxItemCount={Infinity} size={"15"} />
    </div>
  ) : (
    <div>
      <Navbar buttonContent={<FavoriteButtons />} />
      <TestAPI anime={watchIdList} extraClasses={false} />
    </div>
  );
  // <div>
  //     <Navbar buttonContent={<FavoriteButtons />} />
  //     <TestAPI anime={watchIdList} />
  // </div>
};

export default Favorite;
