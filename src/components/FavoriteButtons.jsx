import React, { useContext } from "react";
import '../styles/App.css'
import { AuthContext} from "../context/context"
import { Link } from "react-router-dom";

function HomeButtons() {

    const { setFavoriteCategory } = useContext(AuthContext)



    return (
        <div className="links">
            <button onClick={() => setFavoriteCategory('Смотрю')}>Смотрю</button>
            <button onClick={() => setFavoriteCategory('В планах')}>В планах</button>
            <button onClick={() => setFavoriteCategory('Просмотрено')}>Просмотрено</button>
            <button onClick={() => setFavoriteCategory('Отложено')}>Отложено</button>
            <button onClick={() => setFavoriteCategory('Брошено')}>Брошено</button>
            <button>Отценки</button>
            <Link to={'/home'}>Главная</Link>
        </div>
    );
}

export default HomeButtons;