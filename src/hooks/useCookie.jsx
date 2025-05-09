import { useState } from "react";

const useCookie = (name) => {
  const [value, setValue] = useState(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    if (cookie) {
      return decodeURIComponent(cookie.split("=")[1]);
    }
    return null;
  });

  const setCookie = (value, options = {}) => {
    const expirationDate = new Date();
    expirationDate.setTime(
      expirationDate.getTime() + (options.expires || 365) * 24 * 60 * 60 * 1000,
    );
    const expires = `expires=${expirationDate.toUTCString()}`;
    const path = `path=/`;

    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; ${path}`;
    setValue(value);
  };

  const deleteCookie = () => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    setValue(null);
  };

  return [value, setCookie, deleteCookie];
};

export default useCookie;
