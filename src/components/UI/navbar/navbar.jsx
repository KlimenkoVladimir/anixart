import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext, OptionContext } from "../../../context/context";
import './navbar.css'
import TestServise from "../../../API/TestServise";
import { auth } from "../../../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ buttonContent, setSearch, setAnime, setPage }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const { setOption, setFilter, setType } = useContext(OptionContext)


    const [inputValue, setInputValue] = useState('')
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchAnime();
        }
    };

    const searchAnime = async () => {
        setAnime([]);
        setSearch(inputValue)
        setOption(() => TestServise.getAnimeSearch);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const { authUser, setAuthUser, userDb, setUserDb, favoriteCategory, setFavoriteCategory } = useContext(AuthContext)
    const db = getDatabase();
    const user = auth.currentUser

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);

                const userDbRef = ref(db, 'users/' + user.uid);
                const userDbUnsubscribe = onValue(userDbRef, (snapshot) => {
                    const userDb = snapshot.val();
                    setUserDb(userDb);
                });

                return () => {
                    userDbUnsubscribe();
                };
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            unsubscribeAuth();
        };
    }, []);


    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("sign out successful");
                setUserDb(null)   /// очищаем userDb чтобы пропало фото профиля
                navigate('../');
            })
            .catch((error) => console.log(error));

    };

    return (
        <div className="navbar">
            <div className="row-1">
                <Link className="logo" to={'../'}
                //  onClick={() => {
                //     setAnime([])
                //     setFilter('bypopularity')
                //     setType(null)
                //     setSearch(false)
                //     setPage(1)
                //     setOption(() => TestServise.getAnime)
                //     window.scrollTo({ top: 0, behavior: 'smooth' });}}
                    >
                    <img src="https://anixart.tv/images/logo.svg"></img>
                    <h3>Anixart</h3>
                </Link>
                <div className="search">
                    <input type="text" placeholder="Поиск аниме" value={inputValue} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
                    <Link onClick={searchAnime}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bibisearch" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </Link>

                </div>
                <div className="user-info">
                    <img className="user-img" src={userDb ? (userDb.photoURL || "https://s.abcnews.com/images/US/ABC_silhouette_man_3_sk_141212.jpg") : "https://s.abcnews.com/images/US/ABC_silhouette_man_3_sk_141212.jpg"} alt="user-img" />
                    {authUser ?
                        <Link to="/profile">{userDb ? (userDb.nickname || authUser.email) : authUser.email}</Link>
                        :
                        null
                    }
                </div>
                <div className="navbar-login">
                    {authUser ?

                        <button onClick={userSignOut}>Выйти</button>

                        :
                        <Link to="/login">Войти</Link>
                    }
                </div>
            </div>
            {buttonContent}
        </div>
    )
}

export default Navbar