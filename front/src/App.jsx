import {NavbarMain, Navbarlist } from "./Components/Navbar"
import { Request } from "./Components/Request"


function App() {
  
  return (
    <>
    <div className="min-h-screen bg-[#212121] ">
      <NavbarMain  />
      <Navbarlist />
      <Request />
      
    </div>
    </>
  )
}


export default App
