import React from "react";
import ReactDom from 'react-dom';

export class NavbarMain extends React.Component {
    render(){
        return (
            <>
            <div className="border-b-1 border-[#504f4f]  bg-[#333333]  ">
                <div className="flex space-x-5 text-[15px] text-[#fcfcfc] font-roboto  ">
                    <div className="hover-btn rounded-[4px] m-[7px] px-2 py-1">
                        <div>Home</div>
                    </div>
                    <div className="hover-btn rounded-[4px] m-[7px] px-2 py-1">
                        <div>Workspaces</div>
                    </div>
                </div>
            </div>
            </>
            )
        };
}

export class Navbarlist extends React.Component {
     
    constructor(){
        super();
        this.state = {
             requests: ["Request 1",]
        }
        this.addTab = ()=>{
            const newRequest = `Requests ${this.state.requests.length + 1}`

            this.setState((prevRequests)=>({
                requests: [...prevRequests.requests, newRequest],
            }))
        }
        this.renameReq = () => {
            
        }
    }
    render(){
        return (
                <>
                <div className="
                                font-roboto  text-[15px] text-[#ffffff] 
                                border-b-1 border-[#504f4f]
                                flex">
                    <div >
                        <div className="">
                            <ul className="py-3
                                            flex">
                                {this.state.requests.map((item, index) => (
                                    <li
                                    key={index}
                                    className={`relative pr-2 pl-3 ${
                                        index !== this.state.requests.length - 1 ? 'border-r-2 border-[#b8b8b8]' : ''
                                    }`}
                                    >
                                    <div className="hover-btn px-3 py-1 rounded-[4px] mr-1"
                                        >
                                        {item}
                                    </div>
                                    </li>
                                ))}
                                </ul>
                        
                        
                    </div>
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

 



