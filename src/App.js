import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import HangoutJury from './containers/hangout-jury';
import './App.css';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <HangoutJury />
      </ThemeProvider>
    </div>
  );
}

export default App;
