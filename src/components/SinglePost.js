import React from 'react';
import { Link } from 'react-router-dom';

const SinglePost = ({ post, onDelete }) => {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.content ? `${post.content.substring(0, 100)}...` : ''}</p>
      <Link to={`/posts/${post.id}`}>Read more</Link>
      <button onClick={() => onDelete(post.id)}>Delete</button>
      <Link to={`/update-post/${post.id}`}>Update</Link>
    </div>
  );
};

export default SinglePost;