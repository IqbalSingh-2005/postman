import React, { useState } from "react";
import {NavbarMain, Navbarlist } from "./Components/Navbar"
import { Request } from "./Components/Request"
import { Response } from "./Components/Response"


function App() {
  const [response, setResponse] = useState(null);

  
  const handleSend = async (request) => {
    try {
      const res = await fetch("http://localhost:5000/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      const json = await res.json();
      setResponse(json);
    } catch (err) {
      setResponse({ error: err.message });
    }
  };

  return (
    <>
    <div className="min-h-screen bg-[#212121] ">
      <NavbarMain  />
      <Navbarlist />
      <Request onSend={handleSend} />
      {/* <Response response={response} /> */}
      
    </div>
    </>
  )
}


export default App
