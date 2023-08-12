import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/UI/navbar/navbar";


const ProfileChange = () => {

    return (
        <div className="App">
            <Navbar buttonContent={null} />
            <button>Изменить никнейм</button>
            <button>Изменить статус</button>
            <button>Изменить фото профиля</button>
        </div>

    )
}

export default ProfileChange