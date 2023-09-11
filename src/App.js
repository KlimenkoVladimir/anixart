import React, { useState, useMemo, useEffect } from "react";
import './styles/App.css'
import { BrowserRouter, Route, Routes, Switch, Redirect, Link } from "react-router-dom";
import Navbar from "./components/UI/navbar/navbar";
import AppRouter from "./components/AppRouter";
import { AuthContext, OptionContext } from "./context/context";
import TestAPI from "./components/TestAPI";
import Wallpaper from "./components/Wallpaper";
import TestServise from "./API/TestServise";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  // const [isAuth, setIsAuth] = useState(false)
  const [authUser, setAuthUser] = useState(null);
  const [userDb, setUserDb] = useState(null)
  const [favoriteCategory, setFavoriteCategory] = useState('Смотрю')
  const [option, setOption] = useState(() => TestServise.getAnime);
  const statusLabels = ["Смотрю", "В планах", "Просмотрено", "Отложено", "Брошено"];
  const color = ["#e74c3c", "#f39c12", "#3498db", "#27ae60", "#9b59b6"]
  // useEffect(() => {
  //   if (localStorage.getItem("auth")) {
  //     setIsAuth(true)
  //   }
  // }, [])
  return (
    <AuthContext.Provider value={{
      authUser,
      setAuthUser,
      userDb,
      setUserDb,
      favoriteCategory,
      setFavoriteCategory,
      statusLabels,
      color

    }}>
      <OptionContext.Provider value={{
        option,
        setOption
      }}>
        <BrowserRouter>
          <Provider store={store}>
            <Link to={'/anixart'}>вроде работает</Link>
            <AppRouter />
            {/* <TestAPI/>
            <Wallpaper/> */}
          </Provider>
        </BrowserRouter>
      </OptionContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;
