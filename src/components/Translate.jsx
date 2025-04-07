import React from "react";
import { useTranslation } from "react-i18next";

const Translate = (Component) => {
  return (props) => {
    const { t } = useTranslation();
    return <Component {...props} t={t} />;
  };
};

export default Translate;
