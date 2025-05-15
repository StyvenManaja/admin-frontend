import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetPostById, DeletePost } from '../components/api';
import '../assets/styles.css';

export default function DeletePostPage() {
  const { id } = useParams();  // Récupérer l'ID du post depuis l'URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Pour la redirection après suppression

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await GetPostById(id);
        setPost(fetchedPost);
      } catch (err) {
        setError('Post non trouvé');
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await DeletePost(id);
      navigate('/dashboard');  // Redirection vers le dashboard après suppression
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  return (
    <div className="delete-post-wrapper">
      <h1>Suppression du Post</h1>

      {error && <p className="error">{error}</p>}

      {post && (
        <div>
          <h2>{post.title}</h2>
          <p>Êtes-vous sûr de vouloir supprimer cet article ?</p>

          <button onClick={handleDelete} className="delete-btn">
            Oui, supprimer
          </button>
          <button onClick={() => navigate('/dashboard')} className="cancel-btn">
            Annuler
          </button>
        </div>
      )}
    </div>
  );
}
