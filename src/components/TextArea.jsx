import React from "react";

export const TextArea = ({ className, placeholder, value, onChange }) => {
  return (
    <textarea
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
