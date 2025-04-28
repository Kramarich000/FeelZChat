import React from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import translate from "@utils/translate";

const Error500 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <BsFillExclamationDiamondFill
        className="mb-20"
        size={500}
        color="rgb(14, 116, 144)"
      />
      <h1 className="text-6xl font-bold text-cyan-700">
        {translate("key_500")}
      </h1>
      <p className="text-xl">{translate("key_error_500")}</p>
    </div>
  );
};

export default Error500;
