import React, { useState } from 'react';
import CreatePost from './CreatePost';
import PostList from './PostList';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="home">
      <h2>Create your Delicious Recipe and dh</h2>
      <CreatePost onPostCreated={handlePostCreated} />
      <h2>Home Recipes</h2>
      <PostList />
    </div>
  );
};

export default Home;
