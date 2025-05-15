import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import PostList from './pages/PostList';
import UpdatePost from './pages/UpdatePost';
import DeletePost from './pages/DeletePost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/create" element={<CreatePost />} />
        <Route path="/dashboard/posts" element={<PostList />}></Route>
        <Route path="/dashboard/update/:id" element={<UpdatePost />}></Route>
        <Route path="/dashboard/delete/:id" element={<DeletePost />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
