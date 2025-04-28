import i18next from "i18next";

const translate = (key) => {
  return i18next.t(key, { defaultValue: "NotFound" });
};

export default translate;
