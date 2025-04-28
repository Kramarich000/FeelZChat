import React from "react";
// import Error404 from "@errors/404";
import Error500 from "@errors/500";
import Error400 from "@errors/400";
import Error401 from "@errors/401";
import Error403 from "@errors/403";
import { Link } from "react-router-dom";
import translate from "@utils/translate";

const FallbackComponent = ({ error }) => {
  if (error.message.includes("404")) {
    // return <Error404 />;
  } else if (error.message.includes("500")) {
    return <Error500 />;
  } else if (error.message.includes("400")) {
    return <Error400 />;
  } else if (error.message.includes("403")) {
    return <Error403 />;
  } else if (error.message.includes("401")) {
    return <Error401 />;
  } else {
    return (
      <div>
        <h1>{translate("key_undefined_error")}</h1>
        <p>{translate("key_something_went_wrong")}</p>
        <Link
          className="flex mt-5 flex-wrap justify-center items-center text-center text-white bg-cyan-700 h-[50px] w-[300px] hover:bg-black transition-all"
          to="/"
        >
          Вернуться на главную
        </Link>
      </div>
    );
  }
};

export default FallbackComponent;
