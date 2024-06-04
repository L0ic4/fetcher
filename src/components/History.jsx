import React from "react";

export const History = ({ history, setMethod, setUrl }) => {
  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-xl font-bold my-8">Request History</h2>
      <div className="border rounded p-4 overflow-x-auto overflow-y-auto max-h-80">
        <ul>
          {history.map((req, index) => (
            <li
              key={index}
              className="mb-2 p-2 rounded border hover:bg-primary/90"
            >
              <button
                className="text-sm w-full text-left "
                onClick={() => {
                  setMethod(req.method);
                  setUrl(req.url);
                }}
              >
                {req.method} - {req.url} - {req.status}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
