import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import RegisterSuccess from './pages/RegisterSuccess';
import User from './pages/User';
import UserProfilePage from './pages/UserProfilePage';
import AddNew from './pages/AddNew';
import Post from './pages/Post';
import UserSettings from './pages/UserSettings'
import ReportPostsInfo from './pages/ReportPostsInfo'

const App = () => {
  const user = useSelector((state)=>state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}></Route>
        <Route path="/register" element={ user?.isVerified === false ? <Navigate to="/confirm-register"/> : user?.isVerified === true ? <Navigate to="/"/> : <Register/>}></Route>
        <Route path='/confirm-register' element={<RegisterSuccess/>}></Route>
        <Route path='/user/:username' element={<User/>}></Route>
        <Route path='/users/:username/:user_id' element={<UserProfilePage />} />
        <Route path='/UserSettings' element={<UserSettings/>}></Route>
        <Route path='/ReportPostsInfo' element={user?.isAdmin===true?<ReportPostsInfo/>:<Home/>}></Route>
        <Route path='/add-new' element={!user ? <Navigate to="/"/> : <AddNew/>}></Route>
        <Route path="/post/:id" element={<Post/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
