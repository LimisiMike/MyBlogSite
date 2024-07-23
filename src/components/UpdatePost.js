import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePost, getPost } from '../utils/api';
import { Editor } from '@tinymce/tinymce-react';

const UpdatePost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(postId);
      setTitle(post.title);
      setContent(post.content);
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost(postId, { title, content });
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center' }}>Update Post</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Content</label>
          <Editor
            apiKey="your-tinymce-api-key" // Replace with your TinyMCE API key
            value={content}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={(newContent) => setContent(newContent)}
          />
        </div>
        <button type="submit" style={{ display: 'block', width: '100%', padding: '10px', fontSize: '16px', borderRadius: '4px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePost;