// export const getWatchIdList = (userDb, favoriteCategory) => {
//     return Object.keys(userDb.watchStatusList).filter(key => userDb.watchStatusList[key] === favoriteCategory)
// }

import { getWithoutLetters } from "./score";

export const getWatchIdList = (userDb, favoriteCategory) => {
    if (userDb) {
        return Object.values(userDb.anime).filter(anime => anime.status === favoriteCategory);
    } else {return []} 
}

export const getRatingIdList = (userDb) => {
    if (userDb) {
        return Object.values(userDb.anime).filter(anime => typeof anime.rating === 'number');  
    } else {return []}
}

export const getHoursWatched = (userDb) => {
    if (userDb?.anime) {
        return Object.values(userDb.anime).filter(anime => anime.status === "Просмотрено").map(function(anime) {
            return  Math.round(getWithoutLetters(anime.duration) * anime.episodes / 60)
         }).reduce((sum, cur) => sum + cur, 0)
    } else {return 0}
}

export const getEpWatched = (userDb) => {
    console.log(userDb)
    if (userDb?.anime) {
        return Object.values(userDb.anime).filter(anime => anime.status === "Просмотрено").map(function(anime) {
            return anime.episodes
         }).reduce((sum, cur) => sum + cur, 0)
    } else {return 0}
    
}

