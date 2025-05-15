import React, { useState, useEffect } from 'react';
import { GetAllPost } from '../components/api';
import { Link } from 'react-router-dom';
import '../assets/styles.css';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postList = await GetAllPost();
        setPosts(postList.postList);
      } catch (err) {
        setError(err.message || 'Aucun post trouvé');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list-wrapper">
      <h1>📚 Tous les articles publiés</h1>

      <div className="top-nav">
        <Link className="dashboard-link" to="/dashboard">🏠 Retour au Dashboard</Link>
      </div>

      {isLoading && <p className="info">Chargement en cours...</p>}
      {error && <p className="error">{error}</p>}

      {!isLoading && posts.length > 0 && (
        <div className="post-container">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <Link to={`/dashboard/update/${post._id}`}>
                <h2>{post.title}</h2>
                <p className="author">✍️ {post.author}</p>
                <p className="date">{new Date(post.createdAt).toLocaleDateString()}</p>
              </Link>

              {/* Ajouter le bouton de suppression */}
              <Link to={`/dashboard/delete/${post._id}`} className="delete-btn">🗑️ Supprimer</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
