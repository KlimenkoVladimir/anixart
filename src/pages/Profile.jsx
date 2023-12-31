import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/UI/navbar/navbar";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { AuthContext } from "../context/context";
import "../styles/Profile.css";
import MyModal from "../components/UI/MyModal/MyModal";
import MyInput from "../components/UI/input/MyInput";
import ProfileStatistic from "../components/ProfileStatistic";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import MyButton from "../components/UI/button/MyButton";
import {
  getEpWatched,
  getHoursWatched,
  getWatchIdList,
} from "../components/utils/utils";

const Profile = () => {
  const { authUser, setFavoriteCategory, userDb, setUserDb } =
    useContext(AuthContext);

  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [newValue, setNewValue] = useState("");
  // const [userDb, setUserDb] = useState({})
  const db = getDatabase();
  const user = auth.currentUser;

  const changeNickname = (nickname) => {
    update(ref(db, "users/" + user.uid), {
      nickname: nickname,
    });
    setNewValue("");
    setVisible(false);
  };

  const changeStatus = (status) => {
    update(ref(db, "users/" + user.uid), {
      status: status,
    });
    setNewValue("");
    setVisible(false);
  };

  const changePhoto = (photoURL) => {
    update(ref(db, "users/" + user.uid), {
      photoURL: photoURL,
    });
    setNewValue("");
    setVisible(false);
  };

  const handleSave = () => {
    if (type === "статус") {
      changeStatus(newValue);
    } else if (type === "никнейм") {
      changeNickname(newValue);
    } else if (type === "URL фото") {
      changePhoto(newValue);
    }
  };

  const showModal = (type) => {
    setType(type);
    setPlaceholder(type);
    setVisible(true);
  };

  if (!authUser) {
    // Возвращаем что-то, если пользователь не авторизован
    return <Navbar buttonContent={null} />;
  }

  // const watchIdList = getWatchIdList(userDb, "Просмотрено")
  console.log(userDb);

  return (
    <div className="App">
      <Navbar buttonContent={null} />
      <MyModal visible={visible} setVisible={setVisible}>
        <MyInput
          placeholder={`Введите ${placeholder}`}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        ></MyInput>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <MyButton onClick={handleSave}>Изменить</MyButton>
          <MyButton onClick={() => setVisible(false)}>Отмена</MyButton>
        </div>
      </MyModal>
      <div id="profile">
        <div className="column" id="column-1">
          <img
            id="profile-image"
            src={
              userDb
                ? userDb.photoURL ||
                  "https://s.abcnews.com/images/US/ABC_silhouette_man_3_sk_141212.jpg"
                : "https://s.abcnews.com/images/US/ABC_silhouette_man_3_sk_141212.jpg"
            }
            alt="user-img"
          />
          <h4>{userDb ? userDb.nickname || authUser.email : authUser.email}</h4>
          <h6>{userDb ? userDb.status || "Статус" : "Статус"}</h6>
          <div className="change-buttons">
            <button onClick={() => showModal("никнейм")}>
              Изменить никнейм
            </button>
            <button onClick={() => showModal("статус")}>Изменить статус</button>
            <button onClick={() => showModal("URL фото")}>
              Изменить фото профиля
            </button>
          </div>
        </div>

        <div className="column" id="column-2">
          <h2>Статистика</h2>
          <ProfileStatistic />
          <div className="statistic-in-namers">
            <h5>Просмотрено серий: {getEpWatched(userDb)}</h5>
            <h5>Время просмотра: ~ {getHoursWatched(userDb)} часов</h5>
          </div>
        </div>
        <div className="column" id="column-3">
          <div className="ratind-header">
            <h2>Оценки релизов</h2>
            <Link
              to={"/favorite"}
              onClick={() => setFavoriteCategory("Оценки")}
            >
              Все
            </Link>
          </div>
          <Rating
            maxItemCount={3}
            starIcons={true}
            size={"15"}
            extraClasses={true}
          />
          {/* <div className="card-mini">

                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
