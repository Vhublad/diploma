import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import Auth from './pages/Auth/Auth';
import Topic from './pages/Topic/Topic';
import { IAuthor, IPost } from './types/Post';
import AddPostForm from './components/Form/Form';

function App() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem('isAuth')
      ? Boolean(localStorage.getItem('isAuth'))
      : false
  );
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              isAuth={isAuth}
              posts={posts}
              setPosts={setPosts}
              authors={authors}
              setAuthors={setAuthors}
            />
          }
        />
        <Route path="/auth" element={<Auth setIsAuth={setIsAuth} />} />
        <Route
          path="/topic/:id"
          element={<Topic isAuth={isAuth} posts={posts} />}
        />
        <Route
          path="/addpost"
          element={<AddPostForm setPosts={setPosts} setAuthors={setAuthors} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
