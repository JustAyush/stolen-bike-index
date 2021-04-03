import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './assets/styles/theme';
import GlobalStyles from './assets/styles/GlobalStyles';
import { Home } from './pages';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Home />
    </ThemeProvider>
  );
}

export default App;
