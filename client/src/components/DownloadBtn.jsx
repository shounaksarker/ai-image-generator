import { saveAs } from "file-saver";
import React, { useState } from "react";

const DownloadBtn = ({ imgUrl }) => {
  
  function createUniqueShortId() {
    const possibleCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let shortId = "";
    for (let i = 0; i < 6; i++) {
      shortId += possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
    }
    return shortId;
  }

  //? image Saving function
  const handleSave = async () => {
    const id = createUniqueShortId();
    saveAs(imgUrl, `ai-${id}.jpg`);
  };

  return (
    <div>
      <button
        onClick={handleSave}
        className="bg-[#6469ff] text-white  rounded-md text-sm font-medium w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Download
      </button>
    </div>
  );
};

export default DownloadBtn;
