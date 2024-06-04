import React from "react";
import { FaRegClipboard } from "react-icons/fa";

export const Response = (response) => {
  return (
    <div>
      <div className="flex flex-row flex-nowrap justify-between">
        <h2 className="text-xl font-bold my-8">Response</h2>
        <div className="flex items-center gap-2">
          <button
            className="hover:bg-primary/90 bg-primary rounded text-background px-4 py-2"
            onClick={() =>
              navigator.clipboard.writeText(JSON.stringify(response, null, 2))
            }
          >
            <FaRegClipboard />
          </button>
        </div>
      </div>
      <div className="border rounded p-4 overflow-x-auto overflow-y-auto max-h-[12rem]">
        <pre className="text-sm w-full ">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
    </div>
  );
};
