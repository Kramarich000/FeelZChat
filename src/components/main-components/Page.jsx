import translate from "@utils/translate";
import withMetaTags from "@metadata/Meta";
const Page = ({ component: Component, title, description, url, locale }) => {
  const TranslatedComponent = withMetaTags(Component, {
    title: translate(title),
    description: translate(description),
    url,
    locale: translate(locale),
  });

  return <TranslatedComponent />;
};

export default Page;
