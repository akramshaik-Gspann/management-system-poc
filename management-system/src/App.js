import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { setUser } from './redux/actions';
import Header from './pages/Header';
import { DataProvider } from './data/Context'
import store from './redux/store';
import Gridtable from './pages/GridTable';
// import Uplode from './Component/Uplode/Uplode';
import Ag from './Component/Uplode/Ag';


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
    <DataProvider>
      <Router>
       
        <Header profile={profile}  setProfile={setProfile}/>
        <div className="App">
          <Routes>
            <Route exact path='/' element={<Gridtable/>} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            {/* <Route exact path='/uplode' element={<Uplode />} /> */}
            <Route exact path='/ag' element={<Ag />} />
          </Routes>
        </div>
       
      </Router>
    </DataProvider>
  );
}
export default App;