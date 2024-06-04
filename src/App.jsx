import React, { useState } from "react";
import axios from "axios";
import { FaRocket } from "react-icons/fa";
import { generateTypeDeclaration } from "../utils/utils";
import { Footer } from "./components/Footer";
import { TypeDeclaration } from "./components/TypeDeclaration";
import { Response } from "./components/Response";
import { History } from "./components/History";
import { TextArea } from "./components/TextArea";
import { UrlInput } from "./components/UrlInput";

const initialHeaders = '{"Authorization": "Bearer YOUR_TOKEN_HERE"}';
const initialBody = '{"test": "test"}';
const initialUrl = "https://exemple.com";
const initialMethod = "GET";

function App() {
  const [headers, setHeaders] = useState(initialHeaders);
  const [body, setBody] = useState(initialBody);
  const [response, setResponse] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [method, setMethod] = useState(initialMethod);
  const [history, setHistory] = useState([]);
  const [typeDeclaration, setTypeDeclaration] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async () => {
    setIsLoading(true);
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
      updateTypeDeclaration(res.data);
    } catch (error) {
      setResponse(error.message);
      setHistory([...history, { method, url, status: error.message }]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTypeDeclaration = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      setTypeDeclaration(generateTypeDeclaration(data[0]));
    } else if (typeof data === "object" && data !== null) {
      setTypeDeclaration(generateTypeDeclaration(data));
    }
  };

  const resetFields = () => {
    setHeaders(initialHeaders);
    setBody(initialBody);
    setResponse(null);
    setUrl(initialUrl);
    setMethod(initialMethod);
    setTypeDeclaration("");
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
        <div className="flex flex-col gap-10">
          <h2 className="text-xl font-bold">Request</h2>
          <div className="border p-4 rounded flex flex-row flex-nowrap gap-2">
            <select
              className="bg-background rounded border px-3 py-2 outline-none ring-indigo-300 transition duration-100 focus:ring"
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

            <UrlInput url={url} setUrl={setUrl} />
            <button
              className="bg-primary text-background rounded px-8"
              onClick={sendRequest}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Send"}
            </button>
            <button
              className="bg-secondary rounded text-foreground px-8"
              onClick={resetFields}
            >
              Reset
            </button>
          </div>
          <div className="rounded border p-3 flex flex-row flex-nowrap gap-6">
            <TextArea
              className="bg-background flex-1 rounded border px-3 py-2 outline-none ring-indigo-300 transition duration-100 focus:ring"
              placeholder="Headers (JSON)"
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
            />
            <TextArea
              className="bg-background flex-1 rounded border px-3 py-2 outline-none ring-indigo-300 transition duration-100 focus:ring"
              placeholder="Body (JSON)"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </div>
        <Response response={response} />
        <div className="flex flex-row flex-wrap gap-6">
          <TypeDeclaration typeDeclaration={typeDeclaration} />
          <History history={history} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
