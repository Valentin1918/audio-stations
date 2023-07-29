import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import Routes from './Routes';
import './i18n';
import './assets';
import './App.scss';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Routes />
    </StyledEngineProvider>
  );
}

export default App;
