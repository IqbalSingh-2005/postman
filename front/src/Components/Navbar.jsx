import React from "react";
import ReactDom from 'react-dom';

export class NavbarMain extends React.Component {
    render(){
        var menu= ["Home","Workspaces"]
        return (
            <>
            <div className="p-1 
                            border-b-3 border-[#504f4f]  bg-[#333333]  ">
                    <ul className="flex space-x-5 text-[20px] 
                                text-amber-50 font-roboto ">
                        {menu.map((item, index) => (
                            <li 
                            className="hover-btn rounded-[4px] m-[7px] px-2 py-1"
                            key={index}>{item}</li>
                        ))}
                    </ul>
            </div>
            </>
            )
        };
}

export class Navbarlist extends React.Component {
     
    constructor(){
        super();
        this.state = {
             requests: ["request 1",]
        }
        this.addTab = ()=>{
            const newRequest = `requests ${this.state.requests.length + 1}`

            this.setState((prevRequests)=>({
                requests: [...prevRequests.requests, newRequest],
            }))
        }
    }
    render(){
        return (
                <>
                <div className="p-1
                                font-roboto  text-[18px] text-[#ffffff] 
                                border-b-3 border-[#504f4f]
                                flex">
                    
                        <div >
                            <ul className="py-2 flex text-[20px]">
                                {this.state.requests.map((item, index) => (
                                    <li
                                    key={index}
                                    className={`relative pr-2 pl-3 ${
                                        index !== this.state.requests.length - 1 ? 'border-r-2 border-[#b8b8b8]' : ''
                                    }`}
                                    >
                                    <div className="hover-btn px-3 py-1 rounded-[4px] mr-1">
                                        {item}
                                    </div>
                                    </li>
                                ))}
                                </ul>
                        
                        
                    </div>
                    <div className=" px-5 py-[14px]" >
                        <Add_button onClick={this.addTab} />
                    
                    </div>
                </div>
                </>

        )
    };
}

export class Add_button extends React.Component {
    render(){
        return (
                <>
                <svg 
                onClick={this.props.onClick}
                className="text-[#7e7e7e4d] hover:text-[#e9e9e9] transition-colors duration-100" 
                    width="23px" height="23px" 
                    viewBox="0 0 24 24">
                <path d="M4 12H20M12 4V20" stroke="currentColor"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </>
        )
    };
}

 



