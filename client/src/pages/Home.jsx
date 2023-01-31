import React from "react";
import { Link } from "react-router-dom";
import ai from "../assets/ai.png";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto text-justify">
      <h2 className="text-2xl md:text-5xl text-center font-semibold text-[#6469FF]">
        Welcome to the world of AI
      </h2>

      <div className="mt-12 md:flex md:justify-between md:items-center md:gap-8 ">
        <img src={ai} alt="" className="md:w-[300px]" />
        <p>
          AI, or Artificial Intelligence, refers to the development of computer
          systems that can perform tasks that would typically require human
          intelligence, such as visual perception, speech recognition,
          decision-making, and language translation. The goal of AI research is
          to create machines that can perform tasks that would normally require
          human intelligence to complete, such as understanding natural
          language, recognizing objects and sounds, and making complex
          decisions. In recent years, there has been a significant increase in
          AI applications in various industries, including healthcare, finance,
          and customer service. AI has the potential to improve efficiency and
          accuracy, but it also raises ethical concerns about job displacement
          and privacy. The development of AI is a rapidly evolving field, and
          researchers are working to create algorithms and systems that can
          learn and adapt to new situations, allowing AI to continue to improve
          and provide new solutions to complex problems.
        </p>
      </div>
      <div className="mt-12 flex flex-col justify-center items-center">
        <h4 className="text-2xl underline underline-offset-8">
          Few Examples of AI :
        </h4>
        <div className="flex mt-6 gap-6">
          <div className="p-1 rounded bg-gradient-to-r from-green-500 to-purple-500 shadow-xl">
            <Link to={"/text-image"}>
              <button className="px-6 py-2 text-blue-800 bg-white text-xl font-semibold hover:bg-black hover:text-white duration-500">Text to Image</button>
            </Link>
          </div>
          <div className="p-1 rounded bg-gradient-to-r from-rose-500 to-purple-500 shadow-xl">
          <Link to={"/image-variation"}>
              <button className="px-6 py-2 text-blue-800 bg-white text-xl font-semibold hover:bg-black hover:text-white duration-500">Image Variation</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
