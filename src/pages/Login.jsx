import React, { useContext, useState } from "react";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import {auth} from "../firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {

    const [email, setUserLogin] = useState('');
    const [password, setUserPassword] = useState('')
    const navigate = useNavigate()
    
    const handleLogin = () => {

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential);
            navigate('/home')
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const handleRegister = () => {

        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential);
          })
          .catch((error) => {
            console.log(error);
          });
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