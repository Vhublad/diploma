import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAuthor } from '../../types/Post';
import { API_HTTP } from '../../constants';

interface HeaderProps {
  isAuth: boolean;
  authors: Array<{
    _id: string;
    name: string;
  }>;
  setAuthors: React.Dispatch<React.SetStateAction<IAuthor[]>>;
  setSelectedAuthor: React.Dispatch<React.SetStateAction<string>>;
  selectedAuthor: string;
}

function Header({
  isAuth,
  authors,
  setAuthors,
  selectedAuthor,
  setSelectedAuthor,
}: HeaderProps) {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/auth');
  };

  const handleAddPost = () => {
    navigate('/addpost');
  };

  const handleLogOut = () => {
    async function logout() 
    {
      try {
        if (localStorage.getItem('isAuth')) localStorage.removeItem('isAuth')
        navigate('/');
        window.location.reload();
      }
      catch(e) {
        console.log(e);
      }
    }
    logout()
  };

  useEffect(() => {
    async function getAuthors() {
      try {
        const response = await axios.get(`${API_HTTP}/authors`);
        setAuthors(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getAuthors();
  }, []);

  const handleSelectAuthors = (event: any) => {
    setSelectedAuthor(event.target.value);
  };

  return (
    <header
      style={{
        background: 'gray',
        height: '80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '10px',
        padding: '0 20px',
        margin: '20px',
      }}
    >
      <a href="/" style={{ textDecoration: 'none'}}><h1
        style={{
          color: 'white',
          fontSize: '36px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          margin: '0',
        }}
      >
        Translate
      </h1></a>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!isAuth ? (
        <button
          onClick={handleRegister}
          style={{
            background: 'white',
            color: 'gray',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            marginRight: '16px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          Войти как преподователь
        </button>
        )  : (
          ''
        )}
        {isAuth ? (
          <button
            onClick={handleAddPost}
            style={{
              background: 'white',
              color: 'gray',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              marginRight: '16px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Добавить статью
          </button>
        ) : (
          ''
        )}
        {isAuth ? (
          <button
            onClick={handleLogOut}
            style={{
              background: 'white',
              color: 'gray',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              marginRight: '16px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Выйти
          </button>
        ) : (
          ''
        )}
        <select
          value={selectedAuthor}
          onChange={handleSelectAuthors}
          style={{
            fontSize: '16px',
            padding: '8px',
            border: '2px solid gray',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          <option key="deafult" value="">
            Select an author
          </option>
          {authors.map((author: any) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}

export default Header;
