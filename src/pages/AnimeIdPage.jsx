import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import { AuthContext } from "../context/context";
import Navbar from "../components/UI/navbar/navbar";
import { OptionContext } from "../context/context";
import { homeButtonContent } from "../components/utils/buttonContent";
import TestServise from "../API/TestServise";
import { getScore, getSeason, getWithoutLetters, getWithoutBracket } from "../components/utils/score";
import '../styles/AnimeIdPage.css'
import MyModal from "../components/UI/MyModal/MyModal";
import { auth } from "../firebase";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import HomeButtons from "../components/HomeButtons";
import StarIcons from "../components/StarsIcons";
import Bar from "../components/Bar"
import RatingBars from "../components/RatingBars";
import Related from "../components/Related";
import MyButton from "../components/UI/button/MyButton";

const AnimeIdPage = () => {
    const params = useParams()

    const [animeById, setAnimeById] = useState([])
    const [watchStatus, setWatchStatus] = useState('Не смотрю')
    const [animeStatistic, setAnimeStatistic] = useState([])
    const [animePictires, setAnimePictires] = useState([])
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
        update(ref(db, 'users/' + user.uid + '/anime/' + animeById.data.mal_id), {
            // [animeById.data.mal_id]: status
            // [animeById.data.mal_id]: {
            //     title: [animeById.data.mal_id]
            // }
                ... animeById.data,
                status: status
        });
    }



    const [fetchAnimeById, isAnimeLoadingById, animeErrorById] = useFetching(async (id) => {
        const responce = await TestServise.getAnimeById(id)
        const responceStatistic = await TestServise.getAnimeStatistic(id)
        const responcePictures = await TestServise.getAnimePictures(id)
        setAnimeById(responce.data)
        setAnimeStatistic(responceStatistic.data.data)
        setAnimePictires(responcePictures.data)

    })

    useEffect(() => {
        fetchAnimeById(params.id)
    }, [params.id])
    console.log(userDb)

    if (animeById.length !== 0) {
        return (
            <div>
                <Navbar />
                <MyModal visible={visible} setVisible={setVisible}>
                    <h3 style={{ textAlign: "center", margin: "30px" }}>Выберите статус просмотра</h3>
                    {statusOptions.map((status, index) => (
                        <MyButton key={index} onClick={() => {
                            setWatchStatus(status);
                            changeWatchStatus(status)
                            setVisible(false);
                        }}>{status}</MyButton>
                    ))}
                    <MyButton onClick={() => setVisible(false)}>Отмена</MyButton>
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
                    {user ? (
                        <MyButton onClick={() => setVisible(true)}>
                            {userDb.anime ? (userDb.anime[animeById.data.mal_id]?.status || 'Не смотрю') : 'Не смотрю'}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16" style={{ marginLeft: '5px' }}>
                                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                            </svg>
                        </MyButton>
                    ) : null}
                    <MyButton>Воспроизвести</MyButton>
                    <p>{getWithoutBracket(animeById.data.synopsis)}</p>
                </div>
                <div className="rating-and-statistic">
                    <div className="rating">
                        <h4>Рейтинг</h4>
                        <div className="rating-and-voices">
                            <h3>{getScore(animeById.data.score)}</h3>
                            <h5>{animeById.data.scored_by} голосов</h5>
                        </div>
                        <RatingBars statistic={animeStatistic} />
                        <div className="img-and-stars">
                            <img className="user-img" src={userDb ? (userDb.photoURL || "https://s.abcnews.com/images/US/ABC_silhouette_man_3_sk_141212.jpg") : "https://s.abcnews.com/images/US/ABC_silhouette_man_3_sk_141212.jpg"} alt="user-img" />
                            <StarIcons anime={animeById.data} size={30} />
                        </div>

                    </div>
                    <div className="statistic">
                        <h4>В списках у людей</h4>
                        <Bar statistic={animeStatistic} />

                    </div>

                </div>
                <div className="shots">
                    <h4>Кадры</h4>
                </div>
                <div className="conected">
                    <h4>Связаные релизы</h4>
                    <Related anime={animeById.data} />
                </div>
            </div>
        )
    }
}

export default AnimeIdPage