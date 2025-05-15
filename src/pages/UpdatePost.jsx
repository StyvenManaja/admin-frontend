import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { GetPostById, updatePost } from '../components/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles.css';

export default function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await GetPostById(id);
        setPost({
          title: data.title || '',
          content: data.content || ''
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, post);
      toast.success('Post mis à jour avec succès ✨', {
        position: 'top-center',
        autoClose: 2000,
        onClose: () => navigate('/dashboard/update'),
      });
    } catch (err) {
      toast.error(err.message || 'Erreur lors de la mise à jour');
    }
  };

  if (loading) return <p className="info">Chargement...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="update-post-wrapper">
      <ToastContainer />
      <h1>🛠 Modifier un article</h1>

      <form onSubmit={handleSubmit} className="update-form">
        <label>Titre</label>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          placeholder="Titre du post"
        />

        <label>Contenu</label>
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          placeholder="Contenu du post"
        ></textarea>

        <button type="submit">💾 Enregistrer</button>
      </form>

      <div className="nav-links">
        <Link className="back-link" to="/dashboard/posts">← Retour à la liste des posts</Link>
        <Link className="dashboard-link" to="/dashboard">🏠 Dashboard</Link>
      </div>
    </div>
  );
}
