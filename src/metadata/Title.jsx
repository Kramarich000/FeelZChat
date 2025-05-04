import { Helmet } from 'react-helmet-async';

const withMetaTags = (
  WrappedComponent,
  { title, description, url, locale },
) => {
  const WithMetaTags = (props) => (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        <meta property="og:title" content={title} />
        <meta property="og:locale" content={locale} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <WrappedComponent {...props} />
    </>
  );

  const wrappedName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithMetaTags.displayName = `withMetaTags(${wrappedName})`;

  return WithMetaTags;
};

export default withMetaTags;
