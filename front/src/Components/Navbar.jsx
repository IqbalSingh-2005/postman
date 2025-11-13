import React from "react";
import { IoCloseOutline } from "react-icons/io5";


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
             requests: [],
             activeIndex: 0,
             editingIndex: null, 
             draft: "",
            }

        this.addTab = ()=>{
            const newRequest = `Request ${this.state.requests.length + 1}`;

            fetch("http://localhost:5000/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    name: newRequest,
                    method: "GET",
                    url: "",
                    headers: {},
                    body: "",
                 }),
            })
            .then(() => this.refreshRequests());
        };
    }

    refreshRequests = () => {
             fetch("http://localhost:5000/requests")
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        requests: data
                    });
                });
        };

    loadRequest = (id) => {
    fetch(`http://localhost:5000/request/${id}`)
    .then(res => res.json())
    .then(req => this.props.onSelect(req));
};


    componentDidUpdate(prevProps, prevState) {

            if (this.state.editingIndex !== null &&
                prevState.editingIndex !== this.state.editingIndex &&
                this.inputRef.current
            ) {
                this.inputRef.current.focus();
                this.inputRef.current.select();
            }
        };

    componentDidMount() {
        this.refreshRequests();
}

    inputRef = React.createRef();

    renameReq = (index) => {
            this.setState({
                editingIndex: index,
                draft: this.state.requests[index].name,
            });
        };

    commit = () => {
    const { editingIndex, draft, requests } = this.state;
    if (editingIndex === null) return;

    const req = requests[editingIndex];
    if (!req) return;

    const newName = draft.trim() || req.name;

    fetch(`http://localhost:5000/request/${req.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...req,
            name: newName
        })
    })
    .then(() => this.refreshRequests());

    this.setState({
        editingIndex: null,
        draft: "",
    });
};


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
                        key={item.id}
                        className={` pr-2 pl-2 relative`}
                        onClick={() => { this.setState({ activeIndex: index }); this.loadRequest(item.id); }}

                        > 
                        <div
                        className={`p-1 hover-btn  text-[14px] pr-8 ${index === this.state.activeIndex ? 'border-b-[0.5px] border-[#f1f1f1] text-white' : 'text-[#fff]'}`}
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
                            className="bg-[#1f1f1f]  border-1 border-[#555] rounded-[4px] px-2 py-[2px] text-[#fff] outline-none w-[120px]"
                            />
                            ) : (
                            <span className="block truncate" title={item.name}>{item.name}</span>
                            )}
                        </div>

                        {/* Close button positioned absolutely so it doesn't disturb layout */}
                        <button
                        type="button"
                        aria-label={`Close ${item.name}`}
                        onClick={(e) => {
                        e.stopPropagation();

                        fetch(`http://localhost:5000/request/${item.id}`, {
                            method: "DELETE",
                        })
                        .then(() => this.refreshRequests());
                    }}
                        className="absolute right-1 top-1/2 -translate-y-1/2 text-[#7c7c7caf] hover:text-[#e9e9e9] p-1"
                        >
                        <IoCloseOutline size={16} />
                        </button>

                        {index !== this.state.requests.length - 1 && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-[1.5px] border-[1px] rounded-2xl border-[#7c7c7caf]"></div>
                        )}

                        
                        </li>
                    ))}
                        {this.state.requests.length < 9 && (
                        <li className="pl-2">
                        <Add_button onClick={this.addTab} />
                        </li>
                        )}
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
                <path d="M4 12H20M12 4V20" stroke="currentColor"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </>
        )
    };
}

 



