import React from "react";
import Navbar from "../components/UI/navbar/navbar";
import { favoriteButtonContent } from "../components/utils/buttonContent";

const Favorite = () => {

    return (
        <div>
            <Navbar buttonContent={favoriteButtonContent}/>
            FavoriteContent
        </div>
    )
}

export default Favorite;