import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);

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
    <div className="">
      <h1>Fetcher</h1>
      <div>
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <textarea
          placeholder="Headers (JSON)"
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
        />
        <textarea
          placeholder="Body (JSON)"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button onClick={sendRequest}>Send</button>
      </div>
      <div>
        <h2>Response</h2>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
