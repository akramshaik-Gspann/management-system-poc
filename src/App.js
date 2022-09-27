import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { setUser } from './redux/actions';
import Header from './pages/Header';
import store from './redux/store';
import Gridtable from './pages/GridTable';
import Uplod from './Component/Uplod/Uplod';
import Ag from './Component/Uplod/Ag';
import Footer from './pages/Footer';


function App() {
  const dispatch = useDispatch();
  console.log("Store", store.getState())
  const [profile, setProfile] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setProfile(authUser)
        dispatch(setUser(authUser))
      } else {
        dispatch(setUser(null))
      }
    })
  }, [dispatch])

  return (
    <Router>
       
        <Header profile={profile}  setProfile={setProfile}/>
        <div className="App">
          <Routes>
          <Route exact path='/' element={<Register/>} />
            <Route exact path='/gridtable' element={<Gridtable/>} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/uplod' element={<Uplod />} />
            <Route exact path='/ag' element={<Ag />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
  );
}
export default App;