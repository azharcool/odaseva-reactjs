import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import Home from './pages/Home';
import { saveAllObjectList } from 'generic';
import { useDispatch } from 'react-redux';


const GlobalStyle = createGlobalStyle`
  body{
    font-size:5px;
    font-weight: 500;
    background-color: #F5F8FF;
    font-family: 'Manrope';
  } 
`;


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveAllObjectList());

  }, []);

  return (
    <div>
      <Home />
      <GlobalStyle />
    </div>
  );
};

export default App;