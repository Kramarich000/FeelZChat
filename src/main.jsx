import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppWithMeta from "@metadata/AppWithMeta.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./i18n";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="575143609253-fkuprof1lpke3qbq78qhns7518ma57cq.apps.googleusercontent.com">
      <AppWithMeta />
    </GoogleOAuthProvider>
  </StrictMode>,
)
