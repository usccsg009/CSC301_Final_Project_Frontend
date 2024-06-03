import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddBlog.css';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/blogs', { title, content });
      navigate('/');
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <div className="add-blog-container">
      <h1>Add a New Blog Post</h1>
      <form onSubmit={handleSubmit} className="add-blog-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Blog Post</button>
      </form>
    </div>
  );
};

export default AddBlog;
