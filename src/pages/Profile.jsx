import React, { useContext, useEffect, useState } from "react";
import { homeButtonContent } from "../components/utils/buttonContent";
import Navbar from "../components/UI/navbar/navbar";
import { auth } from "../firebase"
import { updateProfile } from "firebase/auth";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { AuthContext } from "../context/context";
import "../styles/Profile.css"
import { Link } from "react-router-dom";
import MyModal from "../components/UI/MyModal/MyModal";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";


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

        // updateProfile(user, {
        //     displayName: nickname
        // })
        //     .then(() => {
        //         console.log(`Никнейм успешно изменен ${nickname}`);
        //         setVisible(false)
        //     })
        //     .catch((error) => {
        //         console.error("Ошибка при изменении никнейма:", error);
        //     });
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

    useEffect(() => {
        const userDbRef = ref(db, 'users/' + user.uid);
        onValue(userDbRef, (snapshot) => {
            const userDb = snapshot.val();
            setUserDb(userDb);
        });
    }, [db, user]);

    console.log(userDb, user)


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
                    <img id="profile-image"  src={userDb ? (userDb.photoURL || "https://s.abcnews.com/images/US/ABC_silhouette_man_3_sk_141212.jpg") : "https://s.abcnews.com/images/US/ABC_silhouette_man_3_sk_141212.jpg"}  alt="user-img" />
                    <h3>{userDb ? (userDb.nickname || authUser.email) : authUser.email}</h3>
                    <h3>{userDb ? (userDb.status || 'Статус') : 'Статус'}</h3>
                    {/* <Link to={'/profile/change'}>Редактировать</Link> */}
                    <button onClick={() => showModal('никнейм')}>Изменить никнейм</button>
                    <button onClick={() => showModal('статус')}>Изменить статус</button>
                    <button onClick={() => showModal('URL фото')}>Изменить фото профиля</button>
                </div>

                <div className="column" id="column-2">
                    <h2>Статистика</h2>
                    <ul>
                        <li>
                            <img />
                            <h3>Смотрю</h3>
                        </li>
                        <li>
                            <img />
                            <h3>В планах</h3>
                        </li>
                        <li>
                            <img />
                            <h3>Просмотено</h3>
                        </li>
                        <li>
                            <img />
                            <h3>Отложено</h3>
                        </li>
                        <li>
                            <img />
                            <h3>Брошено</h3>
                        </li>
                    </ul>
                    <img />
                    <h3>Просмотрено серий:</h3>
                    <h3>Время просмотра: ~</h3>
                </div>
                <div className="column" id="column-3">
                    <h2>Оценки релизов</h2>
                    <div className="card-mini">

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile