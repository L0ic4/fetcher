import React, { useState } from "react";
import axios from "axios";
import { FaRegClipboard, FaRocket } from "react-icons/fa";

function App() {
  const [headers, setHeaders] = useState(
    '{"Authorization": "Bearer YOUR_TOKEN_HERE"}'
  );
  const [body, setBody] = useState('{"test": "test"}');
  const [response, setResponse] = useState(null);
  const [url, setUrl] = useState("https://exemple.com");
  const [method, setMethod] = useState("GET");
  const [history, setHistory] = useState([]);

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
      setHistory([...history, { method, url, status: res.status }]);
    } catch (error) {
      setResponse(error.message);
      setHistory([...history, { method, url, status: error.message }]);
    }
  };
  const resetFields = () => {
    setHeaders('{"Authorization": "Bearer YOUR_TOKEN_HERE"}');
    setBody('{"test": "test"}');
    setResponse(null);
    setUrl("https://exemple.com");
    setMethod("GET");
  };

  return (
    <>
      <div className="flex justify-center items-center m-12">
        <div className="text-4xl font-bold flex-row inline-flex text-center gap-4">
          <h1>Fetcher</h1>
          <FaRocket />
        </div>
      </div>
      <div className="bg-card text-card-foreground container m-auto p-12 rounded border">
        <div className=" flex flex-col gap-10">
          <h2 className="text-xl font-bold">Request</h2>
          <div className="border p-4 rounded flex flex-row flex-nowrap gap-2">
            <select
              className="rounded border px-3 py-2 outline-none ring-indigo-300 transition duration-100 focus:ring"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="GET" className="bg-green-100 rounded outline-none">
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
            <button
              className="bg-secondary rounded text-foreground px-8"
              onClick={resetFields}
            >
              Reset
            </button>
          </div>
          <div className="rounded border p-3 flex flex-row flex-nowrap gap-6">
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
          <div className="flex flex-row flex-nowrap justify-between">
            <h2 className="text-xl font-bold my-8">Response</h2>
            <button
              className="bg-primary rounded text-foreground px-4 py-2 mt-2 flex items-center"
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(response, null, 2))
              }
            >
              <FaRegClipboard />
              Copy to Clipboard
            </button>
          </div>
          <div className="border rounded p-4 overflow-x-auto overflow-y-auto max-h-96">
            <pre className="text-sm w-full ">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold my-8">Request History</h2>
          <div className="border rounded p-4 overflow-x-auto overflow-y-auto max-h-80">
            <ul>
              {history.map((req, index) => (
                <li key={index} className="mb-2 p-2 rounded border">
                  <span className="text-sm w-full">
                    {req.method} - {req.url} - {req.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
