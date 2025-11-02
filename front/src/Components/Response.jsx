import React from "react";
import Editor from "@monaco-editor/react";



export class Response extends React.Component {
  constructor() {
    super();
    this.result = ["Body", "Headers"];
  }
  render() {
    return (
      <>
      <div className="border-2 border-[#9e9e9e66]
        m-4  h-full min-h-[400px] 
      ">
            <div className="">
              
              <select
                className="
                  w-[120px]
                  
                  border-2
                  border-[#504f4f]
                  text-[#bbbbbb]
                  border-t-0
                  border-l-0
                  border-b-0
                  py-1
                  px-1
                  focus:outline-none
                  
                  cursor-pointer
                  transition-colors
                  duration-150
                "
              >
                {this.result.map((method) => (
                  <option key={method.toLowerCase()} value={method.toLowerCase()}>
                    {method}
                  </option>
                ))}
              </select>
              <div className="border-2 
              
              border-l-0
              border-r-0
              border-[#9e9e9e66]">
                <div className="p-2">
                  <p className="text-[#bbbbbb]">Response Body</p>
                  <Editor 
                  defaultLanguage="html"
                  theme="vs-dark"
                  value="ug"
                  options={{
                    fontSize: 14,
                    fontFamily: "Fira Code, monospace",
                    minimap: { enabled: false },
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                  className="text-[#eeeeee]
                  w-full
                  h-full
                  min-h-[400px]"
                    
                    />
                </div>
              </div>
              
            </div>
          

            </div>
            
      
      
      </>
    );
  }
}