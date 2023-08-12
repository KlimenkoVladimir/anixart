import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import { AuthContext } from "../context/context";
import PostServise from "../API/PostServise";
import Navbar from "../components/UI/navbar/navbar";
import { OptionContext } from "../context/context";
import { homeButtonContent } from "../components/utils/buttonContent";
import TestServise from "../API/TestServise";
import { getScore, getSeason, getWithoutLetters, getWithoutBracket } from "../components/utils/score";
import '../styles/AnimeIdPage.css'
import MyModal from "../components/UI/MyModal/MyModal";
import { auth } from "../firebase";
import { getDatabase, ref, set, onValue, update } from "firebase/database";

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
    const [watchStatus, setWatchStatus] = useState('Не смотрю')
    const { authUser, setAuthUser, userDb, setUserDb } = useContext(AuthContext)
    const db = getDatabase();
    const user = auth.currentUser
    const statusOptions = [
        'Не смотрю',
        'Смотрю',
        'В планах',
        'Просмотрено',
        'Отложено',
        'Брошено'
      ];
    const [visible, setVisible] = useState(false)
    const changeWatchStatus = (status) => {
        update(ref(db, 'users/' + user.uid + '/watchStatusList'), {
            [animeById.data.mal_id] : status
        });
    }

    const [fetchAnimeById, isAnimeLoadingById, animeErrorById] = useFetching(async (id) => {
        const responce = await TestServise.getAnimeById(id)
        setAnimeById(responce.data)
    })

    useEffect(() => {
        fetchAnimeById(params.id)
    }, [])
    console.log(animeById, userDb)

    if (animeById.length !== 0) {
        return (
            <div>
                <Navbar buttonContent={homeButtonContent} />
                <MyModal visible={visible} setVisible={setVisible}>
                    <h3>Выберите статус просмотра</h3>
                    {statusOptions.map((status, index) => (
                        <button key={index} onClick={() => {
                            setWatchStatus(status);
                            changeWatchStatus(status)
                            setVisible(false);
                        }}>{status}</button>
                    ))}
                    <button onClick={() => setVisible(false)}>Отмена</button>
                </MyModal>
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
                    <button onClick={() => setVisible(true)}>
                        {userDb.watchStatusList[animeById.data.mal_id] || 'Не смотрю'}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16" style={{ marginLeft: '5px' }}>
                            <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                        </svg>
                    </button>
                    <button>Воспроизвести</button>
                    <p>{getWithoutBracket(animeById.data.synopsis)}</p>
                </div>
            </div>
        )
    }
}

export default AnimeIdPage