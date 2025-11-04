import React from "react";
import Editor from "@monaco-editor/react";



export class Response extends React.Component {
  constructor(props) {
    super(props);
    this.result = ["Body", "Headers"];
    this.state = { view: "body" };
  }

  handleViewChange = (e) => {
    this.setState({ view: e.target.value });
  };

  render() {
    const resp = this.props.response || {};
    const body = resp.body ?? resp.text ?? "";
    const headers = resp.headers ? JSON.stringify(resp.headers, null, 2) : "";
    const displayValue = this.state.view === "headers" ? headers : (typeof body === 'string' ? body : JSON.stringify(body, null, 2));
    const language = this.state.view === "headers" ? "json" : (typeof body === 'string' && body.trim().startsWith("<") ? "html" : "json");

    return (
      <>
      <div className="border-2 border-[#9e9e9e66]
        m-4  h-full min-h-[400px] 
      ">
            <div className="">
              
              <select
                value={this.state.view}
                onChange={this.handleViewChange}
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
                  <p className="text-[#bbbbbb]">Response {this.state.view === 'headers' ? 'Headers' : 'Body'}</p>
                  <Editor 
                  defaultLanguage={language}
                  theme="vs-dark"
                  value={displayValue}
                  options={{
                    fontSize: 14,
                    fontFamily: "Fira Code, monospace",
                    minimap: { enabled: false },
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    lineNumbers: "off",
                  }}
                  className="text-[#eeeeee] w-full h-full min-h-[400px]"
                    />
                </div>
              </div>
              
            </div>
          

            </div>
            
      
      
      </>
    );
  }
}