import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/UI/navbar/navbar";
import TestAPI from "../components/TestAPI";
import { AuthContext } from "../context/context";
import TestServise from "../API/TestServise";
import { useFetching } from "../hooks/useFetching";
import FavoriteButtons from "../components/FavoriteButtons"
import { getRatingIdList } from "../components/utils/utils";
import StarIcons from "./StarsIcons";

const ProfileRating = ({ maxItemCount, starIcons, size, padding, margin, hiwidth, width, height, h4fs, h3fs }) => {

    const { authUser, userDb, favoriteCategory } = useContext(AuthContext)
    const [ratingAnimeList, setRatingAnimeList] = useState({})

    const ratingIdList = userDb && userDb.watchStatusList
        ? getRatingIdList(userDb)
        : [];
    console.log(ratingIdList)

    // const [fetchAnimeById, isAnimeLoadingById, animeErrorById] = useFetching(async (ratingIdList) => {
    //     const responseArray = await Promise.all(ratingIdList.map(async id => {
    //         const response = await TestServise.getAnimeById(id);
    //         return response.data;
    //     }));

    //     setRatingAnimeList(responseArray.map(item => item.data));
    // });

    const [fetchAnimeById, isAnimeLoadingById, animeErrorById] = useFetching(async (ratingIdList) => {
        const responseArray = [];
    
        for (let i = 0; i < ratingIdList.length; i++) {
            const id = ratingIdList[i];
            const response = await TestServise.getAnimeById(id);
            responseArray.push(response.data);
    
            if (i < ratingIdList.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 350)); // Задержка 350 миллисекунд
            }
        }
    
        setRatingAnimeList(responseArray.map(item => item.data));
    });
    

    useEffect(() => {
        // if (ratingIdList.length === 0) {
        //     return; // Не выполняем запрос, если массив пустой
        //   }
        fetchAnimeById(ratingIdList)
    }, [userDb])
    console.log(ratingAnimeList);

    if (!authUser) {
        return <div>Провет</div>
    }

    return (

        <TestAPI maxItemCount={maxItemCount} anime={ratingAnimeList} starIcons={starIcons} size={size} padding={padding} margin={margin} hiwidth={hiwidth} width={width} height={height} h4fs={h4fs} h3fs={h3fs} />

    )
}

export default ProfileRating;