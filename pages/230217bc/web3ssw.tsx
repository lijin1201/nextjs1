import {useState} from "react";

export default function App1() {
    const [state1, setState1] = useState("");

    const cbInit = () => {
        setState1("try init");
        fetch('/api/web3?init').then((rst) => rst.json()).then(rst=>{
            setState1("b1: " + rst.balanceof1 + "id: " + rst.nftid + "b2: " + rst.balanceof2);
        });
    };

    return(
        <div>
            <h1> web3ssw </h1>
            <div> State:
                <button onClick={cbInit}>Init</button>
                State: {state1}
            </div>
        </div>
    );
}