import axios from 'axios';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 16px;
  margin-bottom: 10px;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
  resize: none;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
`;
const ClearButton = styled.button`
  background-color: #e74c3c;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-radius: 5px;
  margin: 0 auto;
  cursor: pointer;
`;

export interface Root {
  data: {
    translations: Translation[];
    from: string;
    translated_characters: number;
  };
}

export interface Translation {
  to: string;
  translated: string[];
}


interface TranslatorProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function Translator({ text, setText }: TranslatorProps) {
  const apiKey = 'G1V03DD-NF14N9C-H58WVN4-QYY47R6';
// EGY52NH-YFCMNX4-G6334D2-9GQZH3Y
  const [transletedText, setTranslatedText] = useState('');

  const requestData = {
    texts: [`${text}`],
    to: ['ru'],
    from: 'en',
  };

  const handleAxiosPost = useCallback(() => {
    axios
      .post('https://api.lecto.ai/v1/translate/text', requestData, {
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((response: Root) => {
        setTranslatedText(response.data.translations[0].translated[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [apiKey, requestData]);

  const handleClear = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setTranslatedText('');
      setText('');
    },
    []
  );

  return (
    <Container>
      <Form>
        <Label>
          Input:
          <TextArea value={text} readOnly />
        </Label>
        <Label>
          Output:
          <TextArea readOnly value={transletedText} />
          <ClearButton onClick={(e) => handleClear(e)}>Clear</ClearButton>
        </Label>
        <Button
          onClick={(event) => {
            handleAxiosPost();
            event.preventDefault();
          }}
        >
          Translate
        </Button>
      </Form>
    </Container>
  );
}

export default Translator;
