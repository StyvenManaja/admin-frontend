const BASE_URL = import.meta.env.VITE_API_URL;

export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error((await response.json()).message);
  return await response.json();
}

export async function getProtectedData() {
    const response = await fetchWithRefresh('/user');

    if (!response.ok) {
      throw new Error('Non autorisé');
    }
  
    return await response.json();
}

export async function logoutUser() {
  await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

export async function GetAllPost() {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    credentials: 'include'
  });
  if (!response.ok) throw new Error((await response.json()).message);
  return await response.json();
}

export async function fetchWithRefresh(url, options = {}) {
    let response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      credentials: 'include',
    });
  
    // Si token expiré
    if (response.status === 401) {
      // Tente refresh
      const refreshResponse = await fetch(`${BASE_URL}/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
  
      if (refreshResponse.ok) {
        // Rejoue la requête d'origine après refresh
        response = await fetch(`${BASE_URL}${url}`, {
          ...options,
          credentials: 'include',
        });
      } else {
        throw new Error('Session expirée');
      }
    }
  
    return response;
  }
  
  export async function GetPostById(id) {
    const response = await fetchWithRefresh(`/post/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (!response.ok) throw new Error('Erreur lors de la récupération du post');
    return await response.json();
  }
  
  
export async function updatePost(id, data) {
    const response = await fetchWithRefresh(`/post/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return await response.json();
}
  
export async function DeletePost(postId) {
  const response = await fetchWithRefresh(`/post/${postId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la suppression');
  }

  return await response.json();
}
