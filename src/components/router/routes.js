import About from "../../pages/About"
import Posts from "../../pages/Posts"
import PostIdPage from "../../pages/PostIdPage"
import Login from "../../pages/Login"
import Home from "../../pages/Home"
import TestAPI from "../TestAPI"
import TestServise from "../../API/TestServise"
import Favorite from "../../pages/Favorite"
import AnimeIdPage from "../../pages/AnimeIdPage"

export const privateRoutes = [
    {component: <About/>, path: '/about', exact: true},
    {component: <Posts/>, path: '/posts', exact: true},
    {component: <AnimeIdPage/>, path: '/:id', exact: true},
    {component: <Home/>, path: '/home', exact: true},
    {component: <Favorite/>, path: '/favorite', expect: true}

]

export const publicRoutes = [
    {component: <Login/>, path: '/login', exact: true},
    {component: <About/>, path: '/about', exact: true},
    {component: <Posts/>, path: '/posts', exact: true},
    {component: <AnimeIdPage/>, path: '/:id', exact: true},
    {component: <Home/>, path: '/home', exact: true},
    {component: <Favorite/>, path: '/favorite', expect: true}

]