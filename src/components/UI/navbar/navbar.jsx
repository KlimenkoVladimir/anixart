import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext, OptionContext } from "../../../context/context";
import MyButton from "../button/MyButton";
import './navbar-home.css'
import TestServise from "../../../API/TestServise";
import { auth } from "../../../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, set, onValue, update } from "firebase/database";

const Navbar = ({ buttonContent }) => {

    const { setOption } = useContext(OptionContext)
    const selectOption = async (serviseMethod) => {
        const newOption = await serviseMethod;
        setOption(newOption);
    }

    const [inputValue, setInputValue] = useState('')
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const searchAnime = async () => {
        const newSearch = await TestServise.getAnimeSearch(inputValue)
        setOption(newSearch)
    }

    const { authUser, setAuthUser, userDb, setUserDb } = useContext(AuthContext)
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

    // useEffect(() => {
    //     const listen = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setAuthUser(user);
    //         } else {
    //             setAuthUser(null);
    //         }
    //     });

    //     return () => {
    //         listen();
    //     };
    // }, []);

    // useEffect(() => {
    //     if (auth.currentUser) {
    //         const userDbRef = ref(db, 'users/' + user.uid);
    //         onValue(userDbRef, (snapshot) => {
    //             const userDb = snapshot.val();
    //             setUserDb(userDb);
    //         });

    //     }
    // }, []);

    // useEffect(() => {
    //     const userDbRef = ref(db, 'users/' + user.uid);   
    //     onValue(userDbRef, (snapshot) => {
    //         const userDb = snapshot.val();
    //         setUserDb(userDb);
    //     });
    // }, []);

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("sign out successful");
            })
            .catch((error) => console.log(error));
    };

    console.log(auth.currentUser, userDb)

    return (
        <div className="navbar">
            <div className="row-1">
                <Link to={'/home'}>
                    <img className="logo" src="https://anixart.tv/images/logo.svg"></img>
                    <h3>Anixart</h3>
                </Link>
                <div className="search">
                    <input type="text" placeholder="Поиск аниме" value={inputValue} onChange={handleInputChange} />
                    <Link onClick={searchAnime}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bibisearch" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </Link>

                </div>
                <div className="user-info">
                    <img src={userDb ? (userDb.photoURL || "https://s.abcnews.com/images/US/ABC_silhouette_man_3_sk_141212.jpg") : "https://s.abcnews.com/images/US/ABC_silhouette_man_3_sk_141212.jpg"} alt="user-img" />
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
            {buttonContent
                ?
                <div className="links">
                    <button onClick={() => selectOption(buttonContent[0].func())}>{buttonContent[0].title}</button>
                    <button onClick={() => selectOption(buttonContent[1].func())}>{buttonContent[1].title}</button>
                    <button onClick={() => selectOption(buttonContent[2].func())}>{buttonContent[2].title}</button>
                    <button onClick={() => selectOption(buttonContent[3].func())}>{buttonContent[3].title}</button>
                    <button onClick={() => selectOption(buttonContent[4].func())}>{buttonContent[4].title}</button>
                    <Link to={'/favorite'}>Закладки</Link>
                </div>
                :
                null
            }
        </div>
    )
}

export default Navbar