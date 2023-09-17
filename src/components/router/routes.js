import About from "../../pages/About";
import Posts from "../../pages/Posts";
import PostIdPage from "../../pages/PostIdPage";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import Favorite from "../../pages/Favorite";
import AnimeIdPage from "../../pages/AnimeIdPage";
import Profile from "../../pages/Profile";
import ProfileChange from "../../pages/ProfileChange";

export const privateRoutes = [
  { component: <About />, path: "/about", exact: true },
  { component: <Posts />, path: "/posts", exact: true },
  { component: <AnimeIdPage />, path: "/anime/:id", exact: true },
  { component: <Home />, path: "/anixart", exact: true },
  { component: <Favorite />, path: "/favorite", expect: true },
  { component: <Profile />, path: "/profile", expect: true },
  { component: <ProfileChange />, path: "profile/change", expect: true },
];

export const publicRoutes = [
  { component: <Login />, path: "/login", exact: true },
  { component: <About />, path: "/about", exact: true },
  { component: <Posts />, path: "/posts", exact: true },
  { component: <Profile />, path: "/profile", expect: true },
  { component: <Favorite />, path: "/favorite", expect: true },
  { component: <AnimeIdPage />, path: "/anime/:id", exact: true },
  { component: <Home />, path: "/anixart", exact: true },
];
