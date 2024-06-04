import React from "react";

export const RequestParamsInput = ({ params, setParams }) => {
  const handleParamChange = (index, field, value) => {
    const newParams = [...params];
    newParams[index][field] = value;
    setParams(newParams);
    setParams(newParams);
  };

  const addParam = () => {
    setParams([...params, { key: "", value: "" }]);
    console.log(params);
  };

  const removeParam = (index) => {
    const newParams = params.filter((_, i) => i !== index);
  
  };

  return (
    <div>
      {params.map((param, index) => (
        <div key={index} className="flex mb-2">
          <input
            className="bg-background flex-1 rounded border px-3 py-2 outline-none ring-indigo-300 transition duration-100 focus:ring mr-2"
            type="text"
            placeholder="Key"
            value={param.key}
            onChange={(e) => handleParamChange(index, "key", e.target.value)}
          />
          <input
            className="bg-background flex-1 rounded border px-3 py-2 outline-none ring-indigo-300 transition duration-100 focus:ring mr-2"
            type="text"
            placeholder="Value"
            value={param.value}
            onChange={(e) => handleParamChange(index, "value", e.target.value)}
          />
          <button
            className="bg-red-500 text-white rounded px-3 py-2"
            onClick={() => removeParam(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="bg-green-500 text-white rounded px-3 py-2"
        onClick={addParam}
      >
        Add Param
      </button>
    </div>
  );
};
