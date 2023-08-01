import React, { useContext, useState } from "react";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context/context";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import firebase from "firebase";
// import "firebase/firestore";
// import "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    // const { isAuth, setIsAuth } = useContext(AuthContext)
    // const login = event => {
    //     event.preventDefault();
    //     setIsAuth(true);
    //     localStorage.setItem('auth', 'true')

    // }



    const [email, setUserLogin] = useState('');
    const [password, setUserPassword] = useState('')
    const {setAuth, clearAuth, checkAuth} = useAuth()
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user);
                setAuth(user)
                // dispatch(setUser({
                //     email: user.email,
                //     token: user.accessToken,
                //     id: user.uid
                // }))
                // localStorage.setItem('auth', 'true');
                // localStorage.setItem('email', user.email);
                navigate('/home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    const handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user);
                setAuth(user)
                // dispatch(setUser({
                //     email: user.email,
                //     token: user.accessToken,
                //     id: user.uid
                // }))
                // localStorage.setItem('auth', 'true');
                // localStorage.setItem('email', user.email);
                navigate('/home')
            })
            .catch(console.log);
    }


    return (
        <div>
            <h2>Авторизация</h2>
            <MyInput type="text" placeholder="Логин" value={email} onChange={(e) => setUserLogin(e.target.value)} />
            <MyInput type="password" placeholder="Пароль" value={password} onChange={(e) => setUserPassword(e.target.value)} />
            <MyButton onClick={() => handleLogin(email, password)}>Войти</MyButton>
            <MyButton onClick={() => handleRegister(email, password)}>Зарегистрироваться</MyButton>
        </div>
    )
}

export default Login