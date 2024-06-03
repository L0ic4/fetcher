import React, { useState } from "react";
import axios from "axios";
function App() {
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");

  const sendRequest = async () => {
    try {
      const config = {
        method,
        url,
        headers: JSON.parse(headers || "{}"),
        data: body ? JSON.parse(body) : null,
      };
      const res = await axios(config);
      setResponse(res.data);
    } catch (error) {
      setResponse(error.message);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold m-12 text-center">Fetcher</h1>
      <div className="bg-card text-card-foreground container m-auto p-12 rounded border">
        <div className="flex flex-col gap-10">
          <div className="border p-4 rounded flex flex-row flex-nowrap gap-2">
            <select
              className="rounded border px-3 py-2 outline-none ring-indigo-300 transition duration-100 focus:ring"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="GET" className="bg-green-500">
                GET
              </option>
              <option value="POST" className="bg-blue-500">
                POST
              </option>
              <option value="PUT" className="bg-yellow-500">
                PUT
              </option>
              <option value="DELETE" className="bg-red-500">
                DELETE
              </option>
            </select>
            <input
              className="flex-1 rounded border px-3 py-2 outline-none ring-indigo-300 transition duration-100 focus:ring"
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              className="bg-primary rounded text-foreground px-8"
              onClick={sendRequest}
            >
              Send
            </button>
          </div>
          <div className="rounded border p-3 flex flex-row flex-nowrap gap-6">
            {" "}
            <textarea
              className="flex-1 rounded border px-3 py-2 outline-none ring-indigo-300 transition duration-100 focus:ring"
              placeholder="Headers (JSON)"
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
            />
            <textarea
              className=" flex-1 rounded border px-3 py-2 outline-none ring-indigo-300 transition duration-100 focus:ring"
              placeholder="Body (JSON)"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold my-8">Response</h2>
          <div className="border rounded p-4 overflow-x-auto overflow-y-auto max-h-96">
            <pre className="text-sm w-full ">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
