import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/UI/navbar/navbar";
import TestAPI from "../components/TestAPI";
import { AuthContext } from "../context/context";
import TestServise from "../API/TestServise";
import { useFetching } from "../hooks/useFetching";
import FavoriteButtons from "../components/FavoriteButtons"
import { getRatingIdList } from "../components/utils/utils";
import StarIcons from "./StarsIcons";

const ProfileRating = ({ maxItemCount, starIcons, size, gtc,  padding, width, height, h4fs, h3fs }) => {

    const { authUser, userDb, favoriteCategory } = useContext(AuthContext)
    const [ratingAnimeList, setRatingAnimeList] = useState({})

    const ratingIdList = userDb && userDb.anime
        ? getRatingIdList(userDb)
        : [];
    console.log(ratingIdList)

    if (!authUser) {
        return <div>Провет</div>
    }

    return (

        <TestAPI maxItemCount={maxItemCount} anime={ratingIdList} starIcons={starIcons} size={size} gtc={gtc} padding={padding} width={width} height={height} h4fs={h4fs} h3fs={h3fs} />

    )
}

export default ProfileRating;