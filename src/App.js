import React from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import UpdatePost from './components/UpdatePost';
// import SinglePost from './components/SinglePost';
import PostList from './components/PostList';
import PostDetail from './components/PostDetails';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:postId" element={<UpdatePost />} />
      </Routes>
    </>
  );
};

export default App;