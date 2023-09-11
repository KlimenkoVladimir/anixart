import React, { useState, useEffect, useContext } from "react";
import { useFetching } from "../hooks/useFetching";
import { getScore, getSeason } from "./utils/score";
import { OptionContext } from "../context/context";
import { Link } from "react-router-dom";
import StarIcons from "./StarsIcons";


const TestAPI = ({ maxItemCount, anime, starIcons, size, gtc,  padding, width, height, h4fs, h3fs }) => {


    const hc = {
        padding: padding,
        gridTemplateColumns: gtc
    };
    const hiimg = {
        width: width,
        height: height
    };
    const hih4 = {
        fontSize: h4fs
    };
    const hih3 = {
        fontSize: h3fs
    };

    if (!Array.isArray(anime)) {
        return null; // Или другая обработка, если необходимо
    }

    const filteredAnime = anime
    .filter(item => item.title_english)
    // .filter(item => item.scored_by > 10000) // Фильтрует   
    .slice(0, maxItemCount)
    // console.log(filteredAnime)
    if (filteredAnime.length !== 0) {  
        return (
            <div className="home-container" style={hc}>
                {filteredAnime.map((item) => {
                    return (
                        <Link to={`/anime/${item.mal_id}`} className="home-item" key={item.mal_id} onClick={() => window.scrollTo(0, 0)}>
                            <img src={item.images.jpg.large_image_url} style={hiimg} />
                            <div className="home-item-short-discription">
                                <h4 style={hih4}>{getSeason(item.season)} {item.aired.prop.from.year}</h4>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16">
                                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                </svg>
                                <h4 style={hih4}>{item.episodes} эп</h4>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16">
                                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                </svg>
                                <h4 style={hih4}>{getScore(item.score)}</h4>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                            </div>
                            {starIcons ?
                                <StarIcons anime={item} size={size} />
                                : null
                            }
                            <h3 style={hih3}>{item.title_english}</h3>
                        </Link >
                    )
                })}
            </div>
        )
    } else {return <h5 style={{ marginTop: "30vh",  textAlign: "center" }}>Тут пока пусто</h5>}
}

export default TestAPI