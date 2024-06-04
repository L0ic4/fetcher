import React from "react";

export const UrlInput = ({ url, setUrl }) => {
  const handleChange = (e) => {
    let inputValue = e.target.value;
    // Remove quotes from the input value
    inputValue = inputValue.replace(/['"]/g, "");
    setUrl(inputValue);
  };

  return (
    <input
      className="bg-background flex-1 rounded border px-3 py-2 outline-none ring-indigo-300 transition duration-100 focus:ring"
      type="text"
      placeholder="URL"
      value={url}
      onChange={handleChange}
    />
  );
};