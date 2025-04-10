import React from "react";
import { useNavigate } from "react-router-dom";
import { BsEmojiTearFill } from "react-icons/bs";
import translate from "@utils/translate";

const Error403 = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <BsEmojiTearFill className="mb-20" size={500} color="rgb(14, 116, 144)" />
      <h1 className="text-6xl font-bold text-cyan-700">
        {translate("key_403")}
      </h1>
      <p className="text-xl">{translate("key_error_403")}</p>
      <button
        onClick={goBack}
        className="mt-4 bg-cyan-700 p-4 rounded-3xl hover:bg-cyan-600 text-white transition-all"
      >
        {translate("key_return")}
      </button>
    </div>
  );
};

export default Error403;
