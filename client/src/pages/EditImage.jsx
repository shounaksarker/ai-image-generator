import React, { useState } from "react";
import { preview } from "../assets";
import { DownloadBtn, FormField, Loader } from "../components";

const EditImage = () => {
  const [responseImg, setResponseImg] = useState({
    success: "",
    data: "",
  });
  const [myBase64, setMyBase64] = useState(); // for showing the selected img in UI
  const [image, setImage] = useState(); // for sending the image in backend
  const [generatingImg, setGeneratingImg] = useState(false);

  //? -------- set the Image from input field and showing to the UI

  const handleImage = (e) => {
    const fileEl = e.target.files[0];
    setImage(fileEl);

    const fr = new FileReader(fileEl);
    fr.readAsDataURL(fileEl);

    fr.onload = () => {
      setMyBase64(fr.result);
    };
  };

  //! -------- Image generating function
  const generateImg = async (e) => {
    // e.preventDefault();
    setGeneratingImg(true);
    try {
      const formData = new FormData();
      formData.append("file", image);

      await fetch("http://localhost:8080/api/v1/imgEdit", {
        method: "POST",
        body: formData,
      })
        .then((dat) => dat.json())
        .then((res) => {
          setGeneratingImg(false);
          const dup = { ...responseImg };
          dup.success = res.success;
          dup.data = `data:image/png;base64,${res.data}`;
          setResponseImg(dup);
        });

      if (!responseImg.success) {
        throw new Error("Error uploading image");
      }
    } catch (err) {
      alert(error.message);
    }
  };

  //! -------- Image generating on ENTER PRESS
  //   const handleKeyPress = (e) => {
  //     if (e.key === "Enter") {
  //       generateImg()
  //     }
  //   }


  return (
    <section className="max-w-7xl mx-auto">
      <div>
      <h1 className="font-semibold text-[#222328] text-[16px] underline underline-offset-4 text-center mb-8">
          Image Variation
        </h1>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Spoil your own image
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[550px]">
          Make your image more attractive through{" "}
          <span className="underline italic">AiPicGen</span>
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={generateImg}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Image (must be less than 3MB and jpg/jpeg/png format)"
            type="file"
            name="file"
            handleChange={handleImage}
          />

          {/**======================
           *    showing image
           *========================**/}

          <div className="lg:flex  lg:justify-between lg:items-center">
            {/* your image */}
            <div className="relative text-sm border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 w-64 p-3 h-64 flex justify-center items-center">
              {myBase64 ? (
                <img
                  src={myBase64}
                  alt={"Your Image"}
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

            {/* gif  */}
            {generatingImg && <img src="https://www.animatedimages.org/data/media/111/animated-arrow-image-0061.gif" border="0" className="h-[50px]" alt="animated-arrow-image-0061" />}

            {/* edited image */}
            <div className="relative text-sm border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 w-64 p-3 h-64 flex justify-center items-center">
              {responseImg.success ? (
                <img
                  src={responseImg.data}
                  alt={"Response Img"}
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
        </div>
      </form>

      {/* // ---------- Buttons */}
      <div className="mt-5 flex justify-between max-w-3xl">
        <button
            type="submit"
            className="text-white bg-green-700 rounded-md text-sm font-medium w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={()=>generateImg()}
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        {responseImg.data && <DownloadBtn imgUrl={responseImg.data} />}
      </div>
     
    </section>
  );
};

export default EditImage;
