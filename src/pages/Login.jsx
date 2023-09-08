import React, { useContext, useState } from "react";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import "../styles/Login.css"
const Login = () => {

  const [email, setUserLogin] = useState('');
  const [password, setUserPassword] = useState('')
  const navigate = useNavigate()
  const db = getDatabase()
  const user = auth.currentUser

  const handleLogin = () => {

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('../')
      })
      .catch((error) => {
        console.log(error);
        alert('Пользователь не найден')
      });
  }

  const handleRegister = () => {

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('../')
  //       update(ref(db, 'users/' + user.uid + '/anime'), {
        
  // });
      })
      .catch((error) => {
        console.log(error);
        alert('Некоректный логин или пароль')
      });
  }



  return (
    <div className="center-container">
      <h2>Авторизация</h2>
      <MyInput type="text" placeholder="Email" value={email} onChange={(e) => setUserLogin(e.target.value)} />
      <MyInput type="password" placeholder="Пароль" value={password} onChange={(e) => setUserPassword(e.target.value)} />
      <div className="login-buttons">
        <MyButton onClick={() => handleLogin(email, password)}>Войти</MyButton>
        <MyButton onClick={() => handleRegister(email, password)}>Зарегистрироваться</MyButton>
      </div>

    </div>
  )
}

export default Login