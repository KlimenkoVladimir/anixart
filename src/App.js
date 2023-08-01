import React, { useState, useMemo, useEffect } from "react";
import './styles/App.css'
import { BrowserRouter, Route, Routes, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/UI/navbar/navbar";
import AppRouter from "./components/AppRouter";
import { AuthContext, OptionContext } from "./context/context";
import TestAPI from "./components/TestAPI";
import Wallpaper from "./components/Wallpaper";
import TestServise from "./API/TestServise";
import { Provider } from "react-redux";
import { store } from "./store";
import './firebase'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [option, setOption] = useState(TestServise.getAnime())
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true)
    }
  }, [])
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <OptionContext.Provider value={{
        option,
        setOption
      }}>
        <BrowserRouter>
          <Provider store={store}>
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
