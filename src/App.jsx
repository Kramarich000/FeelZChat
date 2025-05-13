import "./App.css";
import { useEffect, Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useResponsive } from "@hooks/useResponsive";
import routes from "@config/routes";

const ToastContainer = lazy(() =>
  import("react-toastify").then((m) => ({ default: m.ToastContainer })),
);
const FallbackComponent = lazy(() => import("@components/FallbackComponent"));
const PrivateRoute = lazy(() => import("@components/PrivateRoute"));
const CookieBanner = lazy(() => import("@components/CookieBanner"));
const Loader = lazy(() => import("@components/Loader"));
const Page = lazy(() => import("@components/main-components/Page"));

// const requestPermissionForPushNotifications = () => {
//   Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       console.log("Разрешение на пуш-уведомления получено");

//       getToken(messaging, {
//         vapidKey: "BMwGXTe80IcVoOJ4b2WHJX9bIDezkBFgjzjB2c1m51NldzPmxwaEVO80TPcG1wqmwExIEjAHi7I9B2_-ysCNCRY",
//       })
//         .then((currentToken) => {
//           if (currentToken) {
//             console.log("FCM Token:", currentToken);
//           } else {
//             console.log("Не удалось получить токен");
//           }
//         })
//         .catch((err) => {
//           console.log("Ошибка при получении токена:", err);
//         });
//     } else {
//       console.log("Разрешение на уведомления отклонено");
//     }
//   });
// };

function App() {
  const { isMobile } = useResponsive();

  useEffect(() => {
    // requestPermissionForPushNotifications();
  }, []);
  return (
    <Router>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <main>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Suspense fallback={<Loader />}>
                    {route.private ? (
                      <PrivateRoute>
                        <Page
                          component={route.component}
                          title={route.titleKey}
                          description={route.descriptionKey}
                          url={route.url}
                          locale={route.locale}
                        />
                      </PrivateRoute>
                    ) : (
                      <Page
                        component={route.component}
                        title={route.titleKey}
                        description={route.descriptionKey}
                        url={route.url}
                        locale={route.locale}
                      />
                    )}
                  </Suspense>
                }
              />
            ))}
          </Routes>
          <CookieBanner />
        </main>
        <Suspense fallback={<Loader />}>
          <ToastContainer
            toastClassName={`mx-auto mt-4 max-w-[90vw]`}
            // newestOnTop
            limit={isMobile ? 1 : 10}
          />
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
