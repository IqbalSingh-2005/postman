import React from "react";
import ReactDom from 'react-dom';

export class NavbarMain extends React.Component {
    render(){
        return (
            <>
            <div className="font-roboto">
            <div className="p-1 flex text-[18px] text-amber-50 border-b-3 border-[#504f4f]  bg-[#333333]  ">
                <div className="hover-btn m-[7px] px-2 py-1">
                    Home</div>
                <div className="hover-btn m-[7px] px-2 py-1">Workspaces</div>
            </div>
            </div>
            </>
               
            )
        };
}

export class Navbarlist extends React.Component {
    render(){
        return (
                <>
                <div>
                    Requests
                </div>
                </>
        )
    };
}

 



