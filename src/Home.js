import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to the Blog Platform</h1>
      <p>Read and manage your blogs here.</p>

      {blogs.length > 0 ? (
        <ul className="blog-list">
          {blogs.map(blog => (
            <li key={blog.id} className="blog-item">
              <Link to={`/blogs/${blog.id}`} className="blog-link">{blog.title}</Link>
              <Link to={`/edit-blog/${blog.id}`} className="edit-link">Edit</Link>
              <button onClick={() => handleDelete(blog.id)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs available. <Link to="/add-blog">Add a new blog</Link></p>
      )}
    </div>
  );

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  }
};

export default Home;
