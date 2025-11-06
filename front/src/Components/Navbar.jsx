import React from "react";

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
             requests: ["Request 1", "Request 2"]
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
                <div className="px-3 py-2 border-b-[1px] border-amber-50">
                        <ul className="flex flex-row  ">
                            {this.state.requests.map((item, index) => (
                                    <li
                                    key={index}
                                    className={` pr-2 pl-2 relative`}
                                    > 
                                    <div className="p-1 hover-btn rounded-[4px]
                                                    text-[14px] text-[#fff]"
                                        >
                                        {item}
                                    </div>
                                    {index !== this.state.requests.length - 1 && (
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-[1.5px] border-[1px] rounded-2xl border-[#7c7c7caf]"></div>
                                    )}
                                    </li>
                                ))}
                                    <li className="pl-2">
                                        <Add_button onClick={this.addTab} />
                                    </li>
                        </ul>
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
                className="text-[#7c7c7caf] hover:text-[#e9e9e9] transition-colors duration-100" 
                    width="16px" height="27px" 
                    viewBox="0 0 24 24">
                <path d="M4 12H20M12 4V20" stroke="currentColor"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </>
        )
    };
}

 



