import React from "react";
import { Link } from "react-router-dom";
import { BsEmojiTearFill } from "react-icons/bs";

const Error400 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <BsEmojiTearFill className="mb-20" size={500} color="rgb(14, 116, 144)" />
      <h1 className="text-6xl font-bold text-cyan-700">400</h1>
      <p className="text-xl">Ваш запрос не может быть обработан. Проверьте введённые данные.</p>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default Error400;
