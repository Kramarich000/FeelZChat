import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);
  const { t } = useTranslation();
  return (
    <header
      className={`header container mx-auto bg-amber-50 min-w-[100%] p-5 transition-all min-h-[100px] ${isLoaded ? "loaded" : ""}`}
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <Link className="block w-10" to="/">
          <img className="" src="/images/logo.png" alt="" />
        </Link>
        <div className="">
          <Link className="hover:underline text-cyan-700" to="/login">
            {t("login")}
          </Link>
          <Link className="hover:underline text-cyan-700" to="/register">
            {t("register")}
          </Link>
        </div>
      </div>
    </header>
  );
}
