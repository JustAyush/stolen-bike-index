import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './assets/styles/theme';
import GlobalStyles from './assets/styles/GlobalStyles';
import { Home } from './pages';
import CacheBuster from './CacheBuster';

function App() {
  return (
    <CacheBuster>
      {({ loading, isLatestVersion, refreshCacheAndReload }) => {
        if (loading) return null;
        if (!loading && !isLatestVersion) {
          refreshCacheAndReload();
        }
        return (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <Home />
          </ThemeProvider>
        );
      }}
    </CacheBuster>
  );
}

export default App;
