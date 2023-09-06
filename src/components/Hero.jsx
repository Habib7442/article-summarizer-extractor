import { logo } from "../assets";

import { Link, useLocation } from "react-router-dom";
const Hero = () => {
  const location = useLocation();

  console.log(location.pathname);

  const heading = () => {
    if (location.pathname === "/") {
      return (
        <h1 className="head_text">
          Extract Your Article with the
          <br className="max-md:hidden" />
          <span className="orange_gradient">
            OpenAI GPT-4 Article Extractor
          </span>
        </h1>
      );
    } else if (location.pathname === "/summarizer") {
      return (
        <h1 className="head_text">
          Summarize Your Article with the
          <br className="max-md:hidden" />
          <span className="orange_gradient">
            OpenAI GPT-4 Article Summarizer
          </span>
        </h1>
      );
    }
  };
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex w-full justify-between items-center mb-5">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain p-2" />
        </Link>
        <div className="flex gap-4">
        <Link to="/summarizer">
          <button
            type="button"
            className="bg-teal-700 hover:bg-blue-700 text-white text-xs font-bold py-2 px-2 rounded-full"
          >
            
            Summarizer
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            className="bg-yellow-700 hover:bg-blue-700 text-white text-xs font-bold py-2 px-2 rounded-full"
          > 
            Extractor
          </button>
        </Link>
        </div>
        <button
          type="button"
          onClick={() => window.open("https://github.com/Habib7442")}
          className="bg-slate-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-2 rounded-full"
        >
          GitHub
        </button>
      </nav>
      {heading()}
      <span className="font-medium text-gray-600 text-sm flex justify-center items-center mt-5">
        Website URL Format : https://www.example.com <br />
        (https://www.linkedin.com, https://unsplash.com/)
      </span>
    </header>
  );
};

export default Hero;
