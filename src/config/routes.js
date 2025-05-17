import { lazy } from "react";

const Register = lazy(() => import("@pages/Register"));
const Login = lazy(() => import("@pages/Login"));
const Chat = lazy(() => import("@pages/Chat"));
const Privacy = lazy(() => import("@pages/Privacy"));
const Terms = lazy(() => import("@pages/Terms"));
const Help = lazy(() => import("@pages/Help"));
const Home = lazy(() => import("@pages/Home"));
const Profile = lazy(() => import("@pages/Profile"));
const ForgotPassword = lazy(() => import("@pages/ForgotPassword"));
const Error404 = lazy(() => import("@pages/errors/404"));

const baseUrl = "https://messenger-app-movb.onrender.com";

const routes = [
  {
    path: "/register",
    component: Register,
    importFunc: () => import("@pages/Register"),
    titleKey: "key_register_1",
    descriptionKey: "key_register_description",
    url: `${baseUrl}/register`,
    locale: "key_page_locale",
  },
  {
    path: "/login",
    component: Login,
    importFunc: () => import("@pages/Login"),
    titleKey: "key_login_1",
    descriptionKey: "key_login_description",
    url: `${baseUrl}/login`,
    locale: "key_page_locale",
  },
  {
    path: "/chat",
    component: Chat,
    importFunc: () => import("@pages/Chat"),
    titleKey: "key_chat",
    descriptionKey: "key_chat_description",
    url: `${baseUrl}/chat`,
    locale: "key_page_locale",
  },
  {
    path: "/privacy",
    component: Privacy,
    importFunc: () => import("@pages/Privacy"),
    titleKey: "key_privacy",
    descriptionKey: "key_privacy_description",
    url: `${baseUrl}/privacy`,
    locale: "key_page_locale",
  },
  {
    path: "/terms",
    component: Terms,
    importFunc: () => import("@pages/Terms"),
    titleKey: "key_terms",
    descriptionKey: "key_terms_description",
    url: `${baseUrl}/terms`,
    locale: "key_page_locale",
  },
  {
    path: "/help",
    component: Help,
    importFunc: () => import("@pages/Help"),
    titleKey: "key_help",
    descriptionKey: "key_help_description",
    url: `${baseUrl}/help`,
    locale: "key_page_locale",
  },
  {
    path: "/",
    component: Home,
    importFunc: () => import("@pages/Home"),
    titleKey: "key_home",
    descriptionKey: "key_home_description",
    url: `${baseUrl}/`,
    locale: "key_page_locale",
  },
  {
    path: "/profile",
    component: Profile,
    importFunc: () => import("@pages/Profile"),
    titleKey: "key_profile_1",
    descriptionKey: "key_profile_description",
    url: `${baseUrl}/profile`,
    private: true,
    locale: "key_page_locale",
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    importFunc: () => import("@pages/ForgotPassword"),
    titleKey: "key_reset_password",
    descriptionKey: "key_reset-password_description",
    url: `${baseUrl}/forgot-password`,
    locale: "key_page_locale",
  },
  {
    path: "*",
    component: Error404,
    titleKey: "key_error",
    descriptionKey: "key_error_description",
    url: `${baseUrl}/*`,
    locale: "key_page_locale",
  },
];

export default routes;
