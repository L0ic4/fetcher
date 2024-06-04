import React from "react";
import { FaRegClipboard } from "react-icons/fa";

export const TypeDeclaration = ({ typeDeclaration }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold my-8">Generated Type Declaration</h2>
      <div className="border rounded p-4 overflow-x-auto overflow-y-auto max-h-80">
        <pre className="text-sm w-full ">{typeDeclaration}</pre>
      </div>
      <div>
        {" "}
        <button
          className="hover:bg-primary/90 bg-primary rounded text-background px-4 py-2 mt-2 flex items-center"
          onClick={() => navigator.clipboard.writeText(typeDeclaration)}
        >
          <FaRegClipboard />
        </button>
      </div>
    </div>
  );
};
