import React, { useState, useRef, useEffect } from "react";


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
             requests: ["Request 1"],
             editingIndex: null,
             draft: "",
                    };

        this.addTab = ()=>{
            const newRequest = `Requests ${this.state.requests.length + 1}`
            this.setState((prevRequests)=>({
                requests: [...prevRequests.requests, newRequest],
            }))
                        }
                }

    componentDidUpdate(prevProps, prevState) {

            if (this.state.editingIndex !== null &&
                prevState.editingIndex !== this.state.editingIndex &&
                this.inputRef.current
            ) {
                this.inputRef.current.focus();
                this.inputRef.current.select();
            }
        };

    inputRef = React.createRef();

    renameReq = (index) => {
            this.setState({
                editingIndex: index,
                draft: this.state.requests[index],
            });
        };

    commit = () => {
            const { editingIndex, draft, requests } = this.state;
            if (editingIndex === null) return;

            const next = [...requests];
            const newValue = draft.trim()
            next[editingIndex] = newValue.length ? newValue : requests[editingIndex];


            this.setState({
                requests: next,
                editingIndex: null,
                draft: "",
            });
        }

    onKeyDown = (e) => {
        if (e.key === "Enter") 
            this.commit();
        };

    render(){
        return (
                <>
                <div className="px-3 py-2 border-b-[1px] border-[#464646]">
                        <ul className="flex flex-row  ">
                            {this.state.requests.map((item, index) => (
                                    <li
                                    key={index}
                                    className={` pr-2 pl-2 relative`}
                                    > 
                                    <div className="p-1 hover-btn rounded-[4px]
                                                    text-[14px] text-[#fff]"
                                                    onDoubleClick={() => this.renameReq(index)}        
                                        >
                                            {this.state.editingIndex === index ? (
                                            <input
                                                ref={this.inputRef}
                                                value={this.state.draft}
                                                onChange={(e) =>
                                                this.setState({ draft: e.target.value })
                                                }
                                                onKeyDown={this.onKeyDown}
                                                onBlur={this.commit} // clicking away saves
                                                className="bg-[#1f1f1f] border border-[#555] rounded-[4px] px-2 py-[2px] text-[#fff] outline-none w-[100px]"
                                            />
                                            ) : (
                                            <span>{item}</span>
                                            )}
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

 



