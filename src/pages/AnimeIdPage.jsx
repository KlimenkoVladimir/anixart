import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostServise from "../API/PostServise";
import Navbar from "../components/UI/navbar/navbar";
import { OptionContext } from "../context/context";
import { homeButtonContent } from "../components/utils/buttonContent";
import TestServise from "../API/TestServise";
import { getScore, getSeason, getWithoutLetters, getWithoutBracket } from "../components/utils/score";
import '../styles/AnimeIdPage.css'

const AnimeIdPage = () => {
    const params = useParams()
    // const [post, setPost] = useState({})
    // const [comments, setComments] = useState([])
    // const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    //     const response = await PostServise.getById(id)
    //     setPost(response.data)
    // })
    // const [fetchPostComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
    //     const response = await PostServise.getCommentsById(id)
    //     setComments(response.data)
    // })

    // useEffect(() => {
    //     fetchPostById(params.id)
    //     fetchPostComments(params.id)

    // }, [])
    // console.log(comments)
    console.log(params.id)

    const [animeById, setAnimeById] = useState([])
    const [fetchAnimeById, isAnimeLoadingById, animeErrorById] = useFetching(async (id) => {
        const responce = await TestServise.getAnimeById(id)
        setAnimeById(responce.data)
    })

    useEffect(() => {
        fetchAnimeById(params.id)
    }, [])
    console.log(animeById)

    if (animeById.length !== 0) {
        return (
            <div>
                <Navbar buttonContent={homeButtonContent}/>
                <div className="anime-page">
                    <h1>{animeById.data.title_english}</h1>
                    <div className="title-secondary">
                        <h3>{animeById.data.title_japanese}</h3>
                        <h4>{`[${animeById.data.title_english}]`}</h4>
                    </div>
                    <div className="discription">
                        <h5>{`Япония, ${getSeason(animeById.data.season).toLowerCase()} ${animeById.data.aired.prop.from.year} г.`}</h5>
                        <h5>{`${animeById.data.episodes} эп. по ~${getWithoutLetters(animeById.data.duration)} мин.`}</h5>
                        <h5>{`Студия ${animeById.data.studios[0].name}`}</h5>
                        <h5>{animeById.data.genres.map(g => g.name.toLowerCase()).join(', ')}</h5>   
                    </div>
                    <button>Воспроизвести</button>
                    <p>{getWithoutBracket(animeById.data.synopsis)}</p>
                </div>
            </div>
        )
    }
}

export default AnimeIdPage