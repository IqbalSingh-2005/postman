import React from "react";

export class Request1 extends React.Component {
  constructor() {
    super();
    this.methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];
  }

  render() {
    return (
      <div className="w-full max-w-screen-lg mx-auto mt-6">
        <div
          className="
            flex items-center
            bg-[#1e1e1e]
            border border-gray-700
            rounded-md
            overflow-hidden
            text-gray-200
          "
        >
          {/* HTTP Method Select */}
          <div className="flex items-center">
            <select
              className="
                bg-[#2b2b2b]
                text-green-400
                font-semibold
                text-sm
                px-3 py-2
                focus:outline-none
                cursor-pointer
                appearance-none
              "
              defaultValue="GET"
            >
              {this.methods.map((method) => (
                <option key={method} value={method} className="text-gray-900">
                  {method}
                </option>
              ))}
            </select>

            {/* Divider */}
            {/* <div className="w-[1px] h-6 bg-gray-700 mx-1"></div> */}
          </div>

          {/* URL Input */}
          <input
            type="text"
            placeholder="Enter URL or paste text"
            className="
              flex-1
              bg-[#1e1e1e]
              text-gray-200
              placeholder-gray-500
              px-3 py-2
              text-sm
              focus:outline-none
            "
          />

          {/* Send Button */}
          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              text-sm
              px-5 py-2
              transition-colors
              duration-150
            "
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}
