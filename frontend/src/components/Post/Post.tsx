import React from 'react';

import { IPost } from '../../types/Post';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_HTTP } from '../../constants';

interface PostProps {
  _id: string;
  title: string;
  author: string;
  description?: string;
  coverImage?: string;
  text?: string;
  isAuth: boolean;
  posts: IPost[];
  setPost: React.Dispatch<React.SetStateAction<IPost[]>>;
}

function Post({ title, author, posts, setPost, _id }: PostProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/topic/${_id}`);
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        margin: '20px',
        width: 'calc(25% - 1rem)',
        backgroundColor: '#F0F4F8',
        border: '1px solid #E4E4E7',
        borderRadius: '5px',
        boxShadow: '1px 1px 10px #E4E4E7',
        padding: '10px',
        cursor: 'pointer',
      }}
    >
      <div>
        <h2>{title}</h2>
        <p>By {author}</p>
      </div>
    </div>
  );
}

export default Post;
