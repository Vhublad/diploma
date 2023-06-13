import React, { useState } from 'react';
import Translator from '../../components/Translator/Translator';
import { IPost } from '../../types/Post';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // import delete icon
import axios from 'axios';
import { API_HTTP } from '../../constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 1200px;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const HomeLink = styled.div`
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border: 2px solid #e6e6e6;
  border-radius: 5px;
  padding: 10px;
  &:hover {
    background-color: aquamarine;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin: 16px 0;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 32px 0 16px;
`;

const MainSection = styled.main`
  display: flex;
  padding: 16px;
`;

const LeftCol = styled.div`
  width: 70%;
  margin-right: 32px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 32px;
  }
`;

const RightCol = styled.div`
  width: 30%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TranslatorContainer = styled.div`
  margin-top: 32px;
`;

const PostText = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 32px;
  letter-spacing: 0.06em;

  span {
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s ease-in-out;

    &:hover {
      border-color: #007acc;
    }
  }
`;
interface TopicProps {
  posts: IPost[];
  isAuth: boolean;
}

const TopicPage = ({ posts, isAuth }: TopicProps) => {
  const navigate = useNavigate();
  const id = window.location.href.split('/')[4];
  const post = posts.find((post) => post._id === id);

  const [text, setText] = useState('');

  async function handleDeletePost(e: any) {
    axios
      .delete(`${API_HTTP}/posts/${id}`)
      .then(function (response) {
        console.log('Successfully deleted data:', response.data);
        setPost((prevPosts: IPost[]) => {
          const newPosts = prevPosts.filter((post) => post._id !== id);
          return newPosts;
        });
      })
      .catch(function (error) {
        console.error('Error deleting data:', error);
      });
    navigate('/');
  }

  const handleAddText = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setText(text + e.currentTarget.innerText);
  };

  return (
    <Container>
      <Header>
        <HomeLink onClick={() => navigate('/')}>Home</HomeLink>
        <div style={{ marginLeft: 'auto' }}>
          {isAuth ? (
            <FaTrash
              onClick={(e) => handleDeletePost(e)}
              style={{
                color: 'red',
                cursor: 'pointer',
                margin: '0 20px',
              }}
            />
          ) : (
            ''
          )}
        </div>
      </Header>
      <Title>{post?.title}</Title>
      <MainSection>
        <LeftCol>
          <SectionTitle>Description</SectionTitle>
          <PostText>{post?.description}</PostText>
          <SectionTitle>Text</SectionTitle>
          <PostText>
            {post?.text.split(' ').map((word, index) => (
              <span key={index} onClick={(e) => handleAddText(e)}>
                {word}{' '}
              </span>
            ))}
          </PostText>
        </LeftCol>
        <RightCol>
          <TranslatorContainer>
            <Translator text={text} setText={setText} />
          </TranslatorContainer>
        </RightCol>
      </MainSection>
    </Container>
  );
};

export default TopicPage;
function setPost(arg0: (prevPosts: IPost[]) => IPost[]) {
  throw new Error('Function not implemented.');
}
