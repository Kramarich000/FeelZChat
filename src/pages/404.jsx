import React from "react";
import { Link } from "react-router-dom";
import { BsEmojiTearFill } from "react-icons/bs";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <BsEmojiTearFill className="mb-20" size={500} color="rgb(14, 116, 144)" />
      <h1 className="text-6xl font-bold text-cyan-700">404</h1>
      <p className="text-xl">Страница не найдена</p>
      <Link to="/" className="mt-4 bg-cyan-700 p-4 rounded-3xl hover:bg-cyan-600 text-white transition-all">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default Error404;
