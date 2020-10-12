import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { selectUser, login, logout } from './features/userSlice'
import Login from './Login';
import { auth } from './firebase';


function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('Hello mate', authUser)
      if (authUser) {
       dispatch(login({
         uid: authUser.uid,
         photo: authUser.photoURL,
         email: authUser.email,
         displayName: authUser.displayName,
       }))
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch])
  return (
    <div className="app">
    {user ? (
      <>
      <Sidebar/>
      <Chat/>
      </>
    ): (
      <Login/>
    )}
    </div>
   
  );
}

export default App;
