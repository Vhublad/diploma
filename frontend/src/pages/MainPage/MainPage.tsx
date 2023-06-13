import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Post from '../../components/Post/Post';
import axios from 'axios';
import { IAuthor, IPost } from '../../types/Post';
import { API_HTTP } from '../../constants';

interface MainProps {
  isAuth: boolean;
  posts: IPost[];
  authors: Array<{
    _id: string;
    name: string;
  }>;
  setAuthors: React.Dispatch<React.SetStateAction<IAuthor[]>>;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

function MainPage({ isAuth, posts, setPosts, authors, setAuthors }: MainProps) {
  const [selectedAuthor, setSelectedAuthor] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${API_HTTP}/posts`);
        setPosts(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <Header
        isAuth={isAuth}
        authors={authors}
        setAuthors={setAuthors}
        selectedAuthor={selectedAuthor}
        setSelectedAuthor={setSelectedAuthor}
      />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          height: 'inherit',
        }}
      >
        {selectedAuthor
          ? posts
              .filter((post) => post.author === selectedAuthor)
              .map((post) => (
                <Post
                  key={post.title}
                  {...post}
                  isAuth={isAuth}
                  posts={posts}
                  setPost={setPosts}
                />
              ))
          : posts.map((post) => (
              <Post
                key={post.title}
                {...post}
                isAuth={isAuth}
                posts={posts}
                setPost={setPosts}
              />
            ))}
      </div>
    </div>
  );
}

export default MainPage;
