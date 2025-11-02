import React from "react";

export class Request extends React.Component {
  constructor() {
    super();
    this.methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];
  }

  render() {
    return (
      <>
        {/* outer container: full width, center optional */}
        <div className="w-full  mx-auto">
          {/* flex row: center vertically, gap between items, padding */}
          <div className="flex items-center px-4 py-6">
            {/* select container: prevent shrinking so select keeps its width */}
            <div className="flex-shrink-0">
              <select
                className="
                  w-[120px]
                  bg-[#464646]
                  border-2
                  border-r-0
                  border-[#504f4f]
                  text-[#bbbbbb]
                  rounded-l-md
                  pt-[8px] pb-[8px]
                  px-2
                  focus:outline-none
                  
                  cursor-pointer
                  transition-colors
                  duration-150
                "
              >
                {this.methods.map((method) => (
                  <option key={method.toLowerCase()} value={method.toLowerCase()}>
                    {method}
                  </option>
                ))}
              </select>
              
            </div>
          
            <div className="flex-1">
                
              <input
                type="text"
                placeholder="https://abc.com"
                className="
                  w-full  min-w-[200px]
                  bg-[#464646]
                  text-[#ffffff]
                  border-2 
                  border-l-0
                  border-[#504f4f]
                  rounded-r-md
                  px-3 py-2
                  focus:outline-none 
                  
                  transition-colors duration-150
                "
              />
            </div>
            <div className="pl-[5px]">
              <SendButton onClick={()=>{
                     // send button
              }} />
              </div>
          </div>
        </div>
      </>
    );
  }
}

export class SendButton extends React.Component {
    render () {
        return(
            <>
            <div>
                 <div className="flex-shrink-0">
              <div
                className="
                
                  w-full  min-w-[100px]
                  bg-[#39393a]
                  border-2
                  border-[#504f4f]
                  text-[#bbbbbb]
                  rounded-md
                  pt-[8px] pb-[8px]
                  px-[30px]
                  hover:bg-[#4d4d4d]
                  cursor-pointer
                "
              >
                Send
              </div>
              
            </div>
            </div>
            </>
        )
    }
}
