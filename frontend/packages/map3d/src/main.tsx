import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import App from '@src/App.tsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from "@shared/auth";
import {reportWebVitals} from "@shared/utils";
import {defaultTheme, Provider as ThemeProvider} from '@adobe/react-spectrum';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <Router>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={defaultTheme}>
              <App/>
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </Router>
    </RecoilRoot>
  </StrictMode>,
);

reportWebVitals(console.log);