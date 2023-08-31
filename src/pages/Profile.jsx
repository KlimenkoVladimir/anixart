import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/UI/navbar/navbar";
import { auth } from "../firebase"
import { updateProfile } from "firebase/auth";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { AuthContext } from "../context/context";
import "../styles/Profile.css"
import MyModal from "../components/UI/MyModal/MyModal";
import MyInput from "../components/UI/input/MyInput";
import ProfileStatistic from "../components/ProfileStatistic";
import ProfileRating from "../components/ProfileRating";
import { Link } from "react-router-dom";
import MyButton from "../components/UI/button/MyButton";
import {getWatchIdList} from "../components/utils/utils"


const Profile = () => {

    const { authUser, setAuthUser, userDb, setUserDb } = useContext(AuthContext)

    const [visible, setVisible] = useState(false)
    const [type, setType] = useState('');
    const [placeholder, setPlaceholder] = useState('')
    const [newValue, setNewValue] = useState('');
    // const [userDb, setUserDb] = useState({})
    const db = getDatabase();
    const user = auth.currentUser


    const changeNickname = (nickname) => {

        update(ref(db, 'users/' + user.uid), {
            nickname: nickname
        });
        setNewValue('')
        setVisible(false)
    }

    const changeStatus = (status) => {
        update(ref(db, 'users/' + user.uid), {
            status: status
        });
        setNewValue('')
        setVisible(false)
    }

    const changePhoto = (photoURL) => {
        update(ref(db, 'users/' + user.uid), {
            photoURL: photoURL
        });
        setNewValue('')
        setVisible(false)
    }

    const handleSave = () => {
        if (type === 'статус') {
            changeStatus(newValue);
        } else if (type === 'никнейм') {
            changeNickname(newValue);
        } else if (type === 'URL фото') {
            changePhoto(newValue)
        }
    }

    const showModal = (type) => {
        setType(type);
        setPlaceholder(type)
        setVisible(true);
    }

    if (!authUser) {
        // Возвращаем что-то, если пользователь не авторизован
        return <Navbar buttonContent={null} />
    }

    const watchIdList = getWatchIdList(userDb, "Просмотрено")
    console.log(watchIdList)


    return (
        <div className="App">
            <Navbar buttonContent={null} />
            <MyModal visible={visible} setVisible={setVisible}>
                <MyInput placeholder={`Введите ${placeholder}`} value={newValue} onChange={(e) => setNewValue(e.target.value)}></MyInput>
                <button onClick={handleSave}>Изменить</button>
                <button onClick={() => setVisible(false)}>Отмена</button>
            </MyModal>
            <div id="profile">
                <div className="column" id="column-1">
                    <img id="profile-image" src={userDb ? (userDb.photoURL || "https://s.abcnews.com/images/US/ABC_silhouette_man_3_sk_141212.jpg") : "https://s.abcnews.com/images/US/ABC_silhouette_man_3_sk_141212.jpg"} alt="user-img" />
                    <h4>{userDb ? (userDb.nickname || authUser.email) : authUser.email}</h4>
                    <h5>{userDb ? (userDb.status || 'Статус') : 'Статус'}</h5>
                    {/* <Link to={'/profile/change'}>Редактировать</Link> */}
                    <button onClick={() => showModal('никнейм')}>Изменить никнейм</button>
                    <button onClick={() => showModal('статус')}>Изменить статус</button>
                    <button onClick={() => showModal('URL фото')}>Изменить фото профиля</button>
                </div>

                <div className="column" id="column-2">
                    <h2>Статистика</h2>
                    <ProfileStatistic />
                    <img />
                    <h5>Просмотрено серий:</h5>
                    <h5>Время просмотра: ~</h5>
                </div>
                <div className="column" id="column-3">
                    <div className="ratind-header">
                        <h2>Оценки релизов</h2>
                        <Link to={'/rating'}>Все</Link>
                    </div>

                    <ProfileRating maxItemCount={4} starIcons={true} size={"15"} padding={"0px"} margin={"15px"} hiwidth={"140px"} width={"136px"} height={"204px"} h4fs={"10px"} h3fs={"12px"} />
                    <div className="card-mini">

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile