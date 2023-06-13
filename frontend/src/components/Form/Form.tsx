import React, { useState } from 'react';
import styled from 'styled-components';
import { IAuthor, IPost } from '../../types/Post';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_HTTP } from '../../constants';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 80%;
  max-width: 600px;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  min-height: 100px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #0077cc;
  color: #fff;
  cursor: pointer;
`;

function AddPostForm({
  setPosts,
  setAuthors,
}: {
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
  setAuthors: React.Dispatch<React.SetStateAction<IAuthor[]>>;
}) {
  const [postTitle, setPostTitle] = useState('');
  const [postAuthor, setPostAuthor] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postText, setPostText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (postTitle && postAuthor && postDescription && postText) {
      try {
        const newPost = await axios.post(`${API_HTTP}/posts`, {
          title: postTitle,
          author: postAuthor,
          description: postDescription,
          text: postText,
        });
        setPosts((prevPosts: any) => [...prevPosts, newPost]);
        setAuthors((pervAuthors: any) => [...pervAuthors, postAuthor]);
        navigate('/');
      } catch (e: any) {
        alert(e.response.data.message);
      }
      setPostTitle('');
      setPostAuthor('');
      setPostDescription('');
      setPostText('');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="post-title">Title</Label>
        <Input
          id="post-title"
          type="text"
          value={postTitle}
          required
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <Label htmlFor="post-author">Author</Label>
        <Input
          id="post-author"
          type="text"
          value={postAuthor}
          required
          onChange={(e) => setPostAuthor(e.target.value)}
        />
        <Label htmlFor="post-description">Description</Label>
        <Input
          id="post-description"
          type="text"
          value={postDescription}
          required
          onChange={(e) => setPostDescription(e.target.value)}
        />
        <Label htmlFor="post-text">Text</Label>
        <TextArea
          id="post-text"
          value={postText}
          required
          onChange={(e) => setPostText(e.target.value)}
        />
        <Button type="submit">Add Post</Button>
      </Form>
    </Container>
  );
}

export default AddPostForm;
