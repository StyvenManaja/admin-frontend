import React, { useState } from 'react';
import { fetchWithRefresh } from '../components/api';
import { useNavigate } from 'react-router-dom';
import '../assets/styles.css'

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchWithRefresh('/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création');
      }

      const result = await response.json();
      setMessage('✅ Post créé avec succès !');
      setTitle('');
      setContent('');

      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="form-container">
      <a href="/dashboard" className="back-link">← Retour au dashboard</a>
      <h2>Créer un Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Titre:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Contenu:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <button type="submit">Créer</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
