import {useState} from "react";

export default function App1() {
    const [state1, setState1] = useState("");
    const [cnt, setCnt] = useState(0);
    const [nfts, setNfts] = useState([]);

    const cbInit = () => {
        setState1("try mint");
        setCnt(cnt+1);
        fetch('/api/nftApi?mint='+cnt).then((rst) => rst.json()).then(rst=>{
            setState1("b1: " + rst.balanceof1 + "id: " + rst.nftid + "b2: " + rst.balanceof2);
        });
    };

    fetch('/api/nftApi?list').then((rst) => rst.json()).then(rst=>{
        setNfts(rst);
    });

    return(
        <div>
            <h1> Mint</h1>
            <div> State:
                <button onClick={cbInit}>Mint</button>
                State: {state1}
            </div>
            <ul>
            {
                nfts.map( (nft:{opt:number,val:string}) => (
                        <li>Opt: {opt} String: {val}
                        </li>
                    ) )
            }
            </ul>
        </div>
    );
}