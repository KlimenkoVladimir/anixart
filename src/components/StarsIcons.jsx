import React, { useContext, useEffect, useState } from "react";
import { AuthContext, OptionContext } from "../context/context";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { auth } from "../firebase"


const StarIcons = ({ anime, size }) => {

  const { authUser, setAuthUser, userDb, setUserDb, favoriteCategory, setFavoriteCategory } = useContext(AuthContext)
  const [selectedIdx, setSelectedIdx] = useState(userDb.ratingList ? (userDb.ratingList[anime.mal_id] || 0) : 0); // Индекс выбранной звезды
  const db = getDatabase();
  const user = auth.currentUser

  const handleStarClick = (num) => {
    setSelectedIdx(num); // Задаем индекс выбранной звезды
    changeRating(num)
  };

  useEffect(() => {
    setSelectedIdx(userDb.ratingList ? (userDb.ratingList[anime.mal_id] || 0) : 0);
  }, [userDb, anime.mal_id]);

  const changeRating = (num) => {
    update(ref(db, 'users/' + user.uid + '/ratingList'), {
      [anime.mal_id]: num
    });
  }

  const stars = [1, 2, 3, 4, 5]; // Создаем массив для отображения звезд

  const starsStyle = size === "15" ? {
    margin: "0",
    display: "flex",
    justifyContent: "center"
  } : {};
  // console.log(selectedIdx, userDb.ratingList[anime.mal_id], userDb.ratingList)

  return (
    <div className="stars" style={starsStyle}>
      {stars.map((num) => (
        <button
          key={num}
          onClick={() => handleStarClick(num)}
          // {userDb.watchStatusList ? (userDb.watchStatusList[animeById.data.mal_id] || 'Не смотрю') : 'Не смотрю'}
          style={{
            color: selectedIdx >= num ? "red" : "currentColor",
            pointerEvents: size === "15" ? "none" : "auto"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default StarIcons;
