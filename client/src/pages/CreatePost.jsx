import React, { useState } from "react";
import { preview } from "../assets";
import { DownloadBtn, FormField, Loader, Toast } from "../components";
import { getRandomPrompt } from "../utils";

const CreatePost = () => {
  const [toast, setToast] = useState(false);
  const [surprise, setSurprise] = useState(false);
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  
  //? -------- setting prompt from input field
  const handleChange = (e) => {
    setForm({ ...form, prompt: e.target.value });
  };
  const handleSurpriseMe = () => {
    setSurprise(true);
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  //! -------- Image generating function
  const generateImg = async (e) => {
    e.preventDefault();
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "No-Allow-Origin": "http://localhost:8080",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })
          .then((dat) => dat.json())
          .then((res) => {
            setForm({ ...form, photo: `data:image/jpeg;base64,${res.photo}` });
            launchToast();
          });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("please enter a prompt");
    }
  };

  //! -------- Image generating on ENTER PRESS
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      generateImg()
    }
  }

  //? -------- Toast Msg
  const launchToast = () => {
    setToast(true);
    setTimeout(function () {
      setToast(false);
    }, 5000);
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Create your own image
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[550px]">
          Create imaginative and visually stunning images through{" "}
          <span className="underline italic">AI Image Generator</span>
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={generateImg}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Propmt"
            type="text"
            name="propmt"
            placeholder="A girl with an umbrella in a rainy night"
            surprise={surprise}
            setSurprise={setSurprise}
            value={form.prompt}
            handleChange={handleChange}
            handleSurpriseMe={handleSurpriseMe}
            handleKeyPress={handleKeyPress}
          />

          {/**======================
           *    showing image
           *========================**/}

          <div className="relative text-sm border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </form>

      {/* // ---------- Buttons */}
      <div className="mt-5 flex gap-5">
          <button
            type="button"
            className="text-white bg-green-700 rounded-md text-sm font-medium w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={generateImg}
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
          {form.photo && <DownloadBtn imgUrl={form?.photo} />}
        </div>
      <Toast
        msg={`Your Image has Prepared...`}
        launchToast={launchToast}
        toast={toast}
      />
    </section>
  );
};

export default CreatePost;
