import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/UI/navbar/navbar";
import TestAPI from "../components/TestAPI";
import { AuthContext } from "../context/context";
import TestServise from "../API/TestServise";
import { useFetching } from "../hooks/useFetching";
import FavoriteButtons from "../components/FavoriteButtons"
import { getWatchIdList } from "../components/utils/utils";

const Favorite = () => {

    const { authUser, userDb, favoriteCategory } = useContext(AuthContext)
    const [watchAnimeList, setWatchAnimeList] = useState({})

    const watchIdList = userDb && userDb.watchStatusList
        ? getWatchIdList(userDb, favoriteCategory)
        : [];
    console.log(watchIdList)

    const [fetchAnimeById, isAnimeLoadingById, animeErrorById] = useFetching(async (watchIdList) => {
        const responseArray = await Promise.all(watchIdList.map(async id => {
            const response = await TestServise.getAnimeById(id);
            return response.data;
        }));

        setWatchAnimeList(responseArray.map(item => item.data));
    });

    useEffect(() => {
        fetchAnimeById(watchIdList)
    }, [favoriteCategory, userDb])
    console.log(watchIdList, watchAnimeList);

    if (!authUser) {
        // Возвращаем что-то, если пользователь не авторизован
        return <Navbar buttonContent={<FavoriteButtons />} />
    }

    return (
        <div>
            <Navbar buttonContent={<FavoriteButtons />} />
            <TestAPI anime={watchAnimeList} />
        </div>
    )
}

export default Favorite;