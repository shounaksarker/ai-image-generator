import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  surprise,
  setSurprise,
  handleSurpriseMe,
  handleKeyPress
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-md font-medium text-gray-900"
        >
          {labelName}
        </label>
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="font-semibold text-md bg-[#ECECF1] py-1 px-2 mx-4 rounded-[5px] text-black"
        >
          Surprise Me
        </button>
      </div>
      {surprise ? (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          required
          onKeyDown= {(e)=>handleKeyPress(e)}
          onClick={()=>setSurprise(false)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#4649ff] outline-none block w-full p-3"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          required
          onKeyDown= {(e)=>handleKeyPress(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#4649ff] outline-none block w-full p-3"
        />
      )}
    </div>
  );
};

export default FormField;
