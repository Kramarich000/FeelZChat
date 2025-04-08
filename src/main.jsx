import { StrictMode, Profiler } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppWithMeta from "@metadata/AppWithMeta.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import './i18n';

const handleRender = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
  console.log('Component rendered:', id);
  console.log('Phase:', phase); 
  console.log('Actual duration (ms):', actualDuration);
  console.log('Base duration (ms):', baseDuration);
  console.log('Start time (ms):', startTime);
  console.log('Commit time (ms):', commitTime);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="575143609253-fkuprof1lpke3qbq78qhns7518ma57cq.apps.googleusercontent.com">
    <Profiler id="App" onRender={handleRender}>
      <AppWithMeta />
      </Profiler>
    </GoogleOAuthProvider>
  </StrictMode>,
)
