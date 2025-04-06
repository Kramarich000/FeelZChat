import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="container mx-auto bg-amber-50 min-w-[100%] p-5 transition-all min-h-[100px]">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <Link className="block w-10" to="/">
          <img className="" src="/images/logo.png" alt="" />
        </Link>
        <div className="">
          <Link className="hover:underline text-cyan-700" to="/login">Вход</Link>
          <Link className="hover:underline text-cyan-700" to="/register">/Регистрация</Link>
        </div>
      </div>
    </header>
  );
}
