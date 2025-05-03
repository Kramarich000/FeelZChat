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
const isDev = import.meta.env.DEV;
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const AppTree = (
  <GoogleOAuthProvider clientId={clientId}>
    <AppWithMeta />
  </GoogleOAuthProvider>
);

const Root = isDev ? (
  <StrictMode>
    <SuspenseWithDelay>{AppTree}</SuspenseWithDelay>
  </StrictMode>
) : (
  <SuspenseWithDelay>{AppTree}</SuspenseWithDelay>
);

createRoot(document.getElementById('root')).render(Root);
