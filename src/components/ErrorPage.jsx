import { useNavigate } from "react-router-dom";
import translate from "@utils/translate";
import DropAnimation from "../animations/emojiAnimaton";

const ErrorPage = ({ errorTitleKey, errorMessageKey }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto">
      <DropAnimation />
      <h1 className="text-3xl sm:text-6xl font-bold">
        {translate(errorTitleKey)}
      </h1>
      <p className="text-lg sm:text-xl">{translate(errorMessageKey)}</p>
      <button
        onClick={goBack}
        className="mt-4 bg-primary h-[40px] w-[200px] sm:h-[50px] sm:w-[300px] rounded-3xl hover:bg-cyan-600 text-white transition-all"
      >
        {translate("key_return")}
      </button>{" "}
    </div>
  );
};

export default ErrorPage;
