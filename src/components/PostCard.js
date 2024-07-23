import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, onDelete }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/posts/${post.id}`);
  };

  const handleUpdate = () => {
    navigate(`/update-post/${post.id}`);
  };

  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 200) + '...' }}></div>
      <div className="post-card-buttons">
        <button onClick={handleReadMore}>Read More</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={() => onDelete(post.id)}>Delete</button>
      </div>
    </div>
  );
};

export default PostCard;