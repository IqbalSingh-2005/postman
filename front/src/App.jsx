import React, { useEffect, useState } from "react";
import {NavbarMain, Navbarlist } from "./Components/Navbar"
import { Request } from "./Components/Request"
import { Response } from "./Components/Response"




function App() {
  const [response, setResponse] = useState(null);
  const [activeRequest, setActiveRequest] = useState(null);


  
  const handleSend = async (request) => {
  try {
    const res = await fetch("http://localhost:5000/api/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request)
    });

    const json = await res.json();
    setResponse(json);

    // after receiving response, update DB only if this request has an id
    if (request && request.id) {
      await fetch(`http://localhost:5000/request/${request.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...request,
          // store both body and headers in the response column as JSON so we can display them later
          response: JSON.stringify({ body: json.body, headers: json.headers || {} }),
          status_code: json.status_code // api returns 'status_code'
        })
      });
    }

  } catch (err) {
    setResponse({ error: err.message });
  }
};


  return (
    <>
    <div className="min-h-screen bg-[#212121] ">
      <NavbarMain  />
      <Navbarlist onSelect={(req) => {setActiveRequest(req); setResponse(null);}}
/>
  <Request onSend={handleSend} request={activeRequest} />
  <Response response={response || activeRequest?.response} />

      
    </div>
    </>
  )
}


export default App
