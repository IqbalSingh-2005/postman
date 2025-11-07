import React from "react";
import { IoIosArrowDown } from "react-icons/io";

export class Request extends React.Component {
  constructor(props) {
    super(props);
    this.methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];
    this.state = { method: "get", url: "" };
  }

  handleMethodChange = (e) => {
    this.setState({ method: e.target.value });
  };

  handleUrlChange = (e) => {
    this.setState({ url: e.target.value });
  };

  handleSend = () => {
  const { method, url } = this.state;
  this.props.onSend({ method, url });
  };


  render() {
    return (
      <>
        {/* outer container: full width, center optional */}
        <div className="p-3">
          {/* flex row: center vertically, gap between items, padding */}
          <div className="flex items-center">
            {/* select container: prevent shrinking so select keeps its width */}
            <div className="relative flex-shrink-0 ">
              <select
                value={this.state.method}
                onChange={this.handleMethodChange}
                className="
                  border-1 border-r-0 border-[#504f4f] 
                  bg-[#464646] text-[#ffffff] font-semibold rounded-l-md 
                  px-3 py-2  focus:outline-none 
                  transition-colors duration-150
                  cursor-pointer
                  
                  appearance-none
                  
                "
              >
                

                {this.methods.map((method) => (
                  <option 
                  key={method.toLowerCase()} value={method.toLowerCase()}>
                    {method}
                  </option>
                ))}
                
              </select>
              <div className="absolute right-2 inset-y-[14px]">
            <IoIosArrowDown color="#ffffff"
                />
            </div>
                  
            </div>
            
            
            <div className="py-[12px] border-t-1 border-b-1 border-[#504f4f] bg-[#464646] ">
              <div className=" right-0 top-1/2  h-4 w-[1.5px] border-[1px] rounded-2xl border-[#7c7c7caf]"></div>
              </div>

            <div className="flex-1">
              
              <input
                value={this.state.url}
                onChange={this.handleUrlChange}
                type="text"
                placeholder="https://abc.com"
                className="
                  w-full
                  border-1 border-l-0 border-[#504f4f] 
                  bg-[#464646] text-[#ffffff] rounded-r-md 
                  px-3 py-2 focus:outline-none 
                  transition-colors duration-150
                  
                  
                "
              />
            </div>
            <div className="pl-[5px]">
              <SendButton onClick={this.handleSend} />
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
              onClick={this.props.onClick}
              role="button"
              tabIndex={0}
              className="
                border-1 border-[#504f4f] 
                  bg-[#464646] text-[#ffffff] font-semibold rounded-md
                  px-5 py-2 focus:outline-none 
                  transition-colors duration-150
                  appearance-none
                  hover:border-[#00388b]
                  hover:bg-[#1163ff]
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
