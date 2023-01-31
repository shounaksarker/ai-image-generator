import React, { useState } from "react";

const Test = () => {
  const [myBase64, setMyBase64] = useState();
  const [png, setPng] = useState(null);

  const handleImage = (e) => {
    const fileEl = e.target.files[0];

    const fr = new FileReader(fileEl);
    fr.readAsDataURL(fileEl);

    fr.onload = () => {
      setMyBase64(fr.result);
      localStorage.setItem("base64", fr.result);

      const base64 = localStorage.getItem("base64");
      if (base64) {
        const png = `data:image/png;${base64}`;
        setPng(png);
      }
    };
    console.log(png);
  };

  const handleSub = (e) => {
    e.preventDefault();
    console.log(e);
  }
  return (
    <div>
      <h1>Test</h1>
      <form encType="multipart/formdata" method="POST" onSubmit={handleSub}>
        <input type="file" id="myimg" name="foo" />
        <input type="submit" value="Test" className="text-red-800"/>
      </form>

      {myBase64 && <img className="mt-16" src={myBase64} />}
      {png && <img src={png} alt="PNG from localStorage" />}
    </div>
  );
};

export default Test;
