// import i18next from "i18next";

// const translate = (key) => {
//   const translated = i18next.t(key);
//   return translated === key ? `[${key}]` : translated;
// };


// export default translate;


import i18next from "i18next";

const translationsCache = {};

i18next.on('languageChanged', () => {
  Object.keys(translationsCache).forEach((key) => {
    delete translationsCache[key];
  });
});

const translate = (key) => {
  if (translationsCache[key]) {
    return translationsCache[key];
  }

  const translated = i18next.t(key);
  translationsCache[key] = translated;

  return translated === key ? `[${key}]` : translated;
};

export default translate;