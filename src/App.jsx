import "./App.css";
import { useMemo, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FallbackComponent from "@components/FallbackComponent";
import PrivateRoute from "@components/PrivateRoute";
import translate from "@utils/translate";
import withMetaTags from "@metadata/Meta";
import { useResponsive } from "@hooks/useResponsive";
import routes from "./config/routes";

const Page = ({ component: Component, title, description, url, locale }) => {
  const TranslatedComponent = useMemo(() => {
    return withMetaTags(Component, {
      title: translate(title),
      description: translate(description),
      url,
      locale: translate(locale),
    });
  }, [Component, title, description, url, locale]);

  return <TranslatedComponent />;
};
import CookieBanner from "@components/CookieBanner";
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
                  route.private ? (
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
                  )
                }
              />
            ))}
          </Routes>
          <CookieBanner />
        </main>
        <ToastContainer
          toastClassName={`mx-auto mt-4 max-w-[90vw]`}
          newestOnTop
          limit={isMobile ? 1 : 10}
        />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
export { routes };
