import React, { useState, useEffect, useContext } from "react";
import TestService from "../API/TestService";
import { useFetching } from "../hooks/useFetching";
import { getScore, getSeason } from "./utils/score";
import { OptionContext } from "../context/context";

const FavoriteContent = () => {
  const [anime, setAnime] = useState([]);
  const { option } = useContext(OptionContext);
  console.log(option);
  const [fetchAnime, isAnimeLoading, animeError] = useFetching(async () => {
    const responce = await option;
    setAnime(responce.data);
  });

  useEffect(() => {
    fetchAnime();
  }, [option]);

  if (anime.length !== 0) {
    // console.log(anime)
    return (
      <div className="home-container">
        {anime.data.map((item) => {
          return (
            <div className="home-item" key={item.members}>
              <img src={item.images.jpg.large_image_url} />
              <div className="home-item-short-discription">
                <h4>
                  {getSeason(item.season)} {item.aired.prop.from.year}
                </h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-dot"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                </svg>
                <h4>{item.episodes} эп</h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-dot"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                </svg>
                <h4>{getScore(item.score)}</h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="currentColor"
                  className="bi bi-star-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              </div>
              <h3>{item.title}</h3>
            </div>
          );
        })}
      </div>
    );
  }
};

export default FavoriteContent;
