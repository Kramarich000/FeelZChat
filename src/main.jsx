import { StrictMode, Profiler } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppWithMeta from '@metadata/AppWithMeta.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './i18n';
import SuspenseWithDelay from '@components/SuspenseWithDelay';
// const handleRender = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
//   console.log('Component rendered:', id);
//   console.log('Phase:', phase);
//   console.log('Actual duration (ms):', actualDuration);
//   console.log('Base duration (ms):', baseDuration);
//   console.log('Start time (ms):', startTime);
//   console.log('Commit time (ms):', commitTime)
// };
const isDevelopment = import.meta.env.VITE_APP_ENV === 'development';
// console.log('VITE_APP_ENV value:', import.meta.env.VITE_APP_ENV);
// console.log('Type of VITE_APP_ENV:', typeof import.meta.env.VITE_APP_ENV);
// console.log('Is development mode:', isDevelopment);

createRoot(document.getElementById('root')).render(
  <SuspenseWithDelay>
    {isDevelopment ? (
      <StrictMode>
        <GoogleOAuthProvider clientId="575143609253-fkuprof1lpke3qbq78qhns7518ma57cq.apps.googleusercontent.com">
          <AppWithMeta />
        </GoogleOAuthProvider>
      </StrictMode>
    ) : (
      <GoogleOAuthProvider clientId="575143609253-fkuprof1lpke3qbq78qhns7518ma57cq.apps.googleusercontent.com">
        <AppWithMeta />
      </GoogleOAuthProvider>
    )}
  </SuspenseWithDelay>,
);
