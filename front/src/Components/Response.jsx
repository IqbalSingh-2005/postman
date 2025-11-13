import React from "react";
import Editor from "@monaco-editor/react";
import { registerMonacoThemes } from "../editorTheme/monacoTheme";





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
    const raw = this.props.response || {};

    // Normalize different shapes: API returns { body, headers }, DB may return a string or parsed object
    let resp = {};
    if (typeof raw === 'string') {
      // try to parse JSON string saved in DB
      try {
        resp = JSON.parse(raw);
      } catch (e) {
        resp = { body: raw };
      }
    } else if (raw && typeof raw === 'object') {
      resp = raw;
    } else {
      resp = {};
    }

    const body = resp.body ?? resp.text ?? "";
    const headers = resp.headers ? JSON.stringify(resp.headers, null, 2) : "";
    const displayValue = this.state.view === "headers" ? headers : (typeof body === 'string' ? body : JSON.stringify(body, null, 2));
    const language = this.state.view === "headers" ? "json" : (typeof body === 'string' && body.trim().startsWith("<") ? "html" : "json");

    return (
      <>
      <div className="border-1 border-[#9e9e9e66]
         mx-1 my-1/2 h-full min-h-[400px] 
      ">
            <div className="mx-4">
              <select
                value={this.state.view}
                onChange={this.handleViewChange}
                className="
                  w-[80px]
                  text-[#bbbbbb]
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
              <div className="
              
              border-l-0
              border-r-0
              border-[#9e9e9e66]">
                <div className="p-2 "
                >
                  
                  <Editor 
                  defaultLanguage={language}
                  value={displayValue}
                  theme="customDark"
                  beforeMount={(monaco) => {
        registerMonacoThemes(monaco);
                  }}
                  options={{
                    
                    fontSize: 14,
                    
                    fontFamily: "Fira Code, monospace",
                    minimap: { enabled: false },
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    
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