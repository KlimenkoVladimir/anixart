import React, { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import WallpaperServise from "../API/WallpaperServise";


const Wallpaper = () => {
    const [wallpaper, setWallpaper] = useState([])
    const [fetchWallpaper, isWallpaperLoading, wallpaperError] = useFetching(async () => {
        const responce = await WallpaperServise.getWallpaper();
        setWallpaper(responce.data)  
    })
    useEffect(() => {
        fetchWallpaper()
    }, [])


    if (wallpaper.length !== 0) {
        console.log(wallpaper)
        return (
            <div className="anime">
                <img src={wallpaper.results[0].urls.regular}/>
            </div>
        )
    }
}

export default Wallpaper
