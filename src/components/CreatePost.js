import React, { useState } from 'react';
import { createPost } from '../utils/api';

const CreatePost = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content };
    try {
      await createPost(newPost);
      onPostCreated(newPost);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Error creating post. Please make sure you are logged in.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="create-post-input"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="create-post-textarea"
      ></textarea>
      <button type="submit" className="create-post-button">Create</button>
    </form>
  );
};

export default CreatePost;