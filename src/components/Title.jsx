import { useEffect } from "react";

const withTitle = (Component, title) => {
  return function WithTitleWrapper(props) {
    useEffect(() => {
      document.title = title;
    }, []);
    return <Component {...props} />;
  };
};

export default withTitle;


