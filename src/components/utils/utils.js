export const getWatchIdList = (userDb, favoriteCategory) => {
    return Object.keys(userDb.watchStatusList).filter(key => userDb.watchStatusList[key] === favoriteCategory)
}

export const getRatingIdList = (userDb) => {
    return Object.keys(userDb.ratingList).filter (key => typeof userDb.ratingList[key] === 'number')
}

