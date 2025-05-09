import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./i18n";
import { Loader } from "@components/Loader";
import { HelmetProvider } from "react-helmet-async";
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
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </GoogleOAuthProvider>
);

const Root = isDev ? (
  <StrictMode>
    <Suspense fallback={<Loader fullscreen />}>{AppTree}</Suspense>
  </StrictMode>
) : (
  <Suspense fallback={<Loader fullscreen />}>{AppTree}</Suspense>
);

createRoot(document.getElementById("root")).render(Root);
