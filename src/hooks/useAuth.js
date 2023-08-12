// import {useDispatch, useSelector} from 'react-redux';
// import { setUser } from '../store/userSlice';

// export function useAuth() {
//     const dispatch = useDispatch()
//     const {email, token, id} = useSelector(state => state.user);

//     const setAuth = (user) => {
//         const userData = {
//             email: user.email,
//             token: user.token,
//             id: user.id
//           };
//         dispatch(setUser(userData));
//         localStorage.setItem('auth', 'true');
//         localStorage.setItem('email', user.email);
//     };
    
//     const clearAuth = () => {
//         dispatch(setUser({ email: '', token: '', id: '' }));
//         localStorage.removeItem('auth');
//         localStorage.removeItem('email');
//     };
    
//     const checkAuth = () => {
//         const isAuth = localStorage.getItem('auth') === 'true';
//         const email = localStorage.getItem('email');
//         return {
//           isAuth: isAuth && !!email,
//           email,
//           token,
//           id,
//         };
//     }   

//     return {
//         setAuth,
//         clearAuth,
//         checkAuth

//     };
// }