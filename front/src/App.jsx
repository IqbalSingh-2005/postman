import {NavbarMain, Navbarlist } from "./Components/Navbar"
import { Request } from "./Components/Request"
import { Response } from "./Components/Response"



function App() {
  
  return (
    <>
    <div className="min-h-screen bg-[#212121] ">
      <NavbarMain  />
      <Navbarlist />
      <Request />
      <Response />
      
      
    </div>
    </>
  )
}


export default App
