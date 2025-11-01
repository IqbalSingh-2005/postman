import React from "react"

export class Request extends React.Component{
    render(){
        return(
            <>
            <div className="flex relative">
            <div className="text-[18px] text-amber-200 pl-[40px] py-[30px]">
                <select
                
                className="
                    bg-amber-50
                    border-2 border-amber-400
                    text-gray-800
                    rounded-md
                    px-2 py-[8.5px]
                    w-full
                    focus:outline-none
                    focus:border-amber-600
                    focus:bg-white
                    transition-colors
                    duration-150
                "
                >
          <option value="get">GET</option>
          <option value="post">POST</option>
          <option value="put">PUT</option>
          <option value="patch">PATCH</option>
          <option value="delete">DELETE</option>
          <option value="head">HEAD</option>
          <option value="options">OPTIONS</option>

        </select>
            </div>
            <div className=" py-[30px]">
                <input
                    type="text"
                    placeholder="https://abc.com"
                    className="
                    w-[700px]
                    bg-amber-50 
                    text-gray-800
                    border-2 border-amber-400 
                    rounded-md
                    px-2 py-2
                    focus:outline-none 
                    focus:border-amber-600 
                    focus:bg-white
                    transition-colors duration-150
                    "
                />
                </div>
                </div>
            </>
        )
    }
}