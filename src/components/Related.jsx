import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/UI/navbar/navbar";
import TestAPI from "../components/TestAPI";
import { AuthContext } from "../context/context";
import TestServise from "../API/TestServise";
import { useFetching } from "../hooks/useFetching";
// import FavoriteButtons from "../components/FavoriteButtons"

const Related = ({ anime }) => {

    const { authUser, setAuthUser, userDb, setUserDb, favoriteCategory, setFavoriteCategory } = useContext(AuthContext)
    const [relatedAnimeList, setRelatedAnimeList] = useState({})

    const relatedIdList = anime.relations
        .filter(item => item.relation !== "Summary" && item.relation !== "Character")
        .flatMap(item => item.entry) // Объединяем все entry из разных объектов в один массив
        .filter(entry => entry.type === "anime") // Оставляем только объекты с type "anime"
        .map(entry => entry.mal_id); // Извлекаем mal_id из объектов

    // console.log(anime.relations)

    const [fetchAnimeById, isAnimeLoadingById, animeErrorById] = useFetching(async (relatedIdList) => {
        const responseArray = [];
        // await new Promise(resolve => setTimeout(resolve, 350)); // Начальная задержка

        for (let i = 0; i < relatedIdList.length; i++) {
            const id = relatedIdList[i];
            const response = await TestServise.getAnimeById(id);
            responseArray.push(response.data);

            if (i < relatedIdList.length) {
                await new Promise(resolve => setTimeout(resolve, 350)); // Задержка 1 секунда
            }
            setRelatedAnimeList(responseArray.map(item => item.data));
        }

        // setRelatedAnimeList(responseArray.map(item => item.data));
    });


    useEffect(() => {
        fetchAnimeById(relatedIdList)
    }, [anime])
    console.log(relatedAnimeList, relatedIdList);
    if(relatedIdList.length === 0) {
        return null
    } else{
        return (
            <div>
                <h4>Связаные релизы</h4>
                <TestAPI anime={relatedAnimeList} />
            </div>
        )  
    }
}

export default Related;