import { count } from "console";
import {useEffect, useState} from "react";

export default function App1() {
    const [state1, setState1] = useState("");
    const [cnt, setCnt] = useState(0);
    const [nfts, setNfts] = useState([]);
    const [supply, setSupply] = useState(0);

    const cbInit = () => {
        setState1("try mint");       
        fetch('/api/nftApi?mint='+cnt).then((rst) => rst.json()).then(rst=>{
            setState1("b1: " + rst.balanceof1 + "id: " + rst.nftid + "b2: " + rst.balanceof2);
        });
        setCnt(cnt+1);
    };

    useEffect(() => {
        const cbList = () => {
            fetch('/api/nftApi?supply').then((rst) => rst.json()).then(rst=>{
                setSupply(rst.supply);
                const count = rst.supply;
                for (var i = 0; i < count ; i++) {
                    //const contact = await contactList.methods.contacts(i).call();
                    fetch('/api/nftApi?list='+i).then((rst) => rst.json()).then(rst=>{
                        setNfts((nfts) => [...nfts, rst.data]);
                    });
                    
                }
            });
            
            
        }
        cbList();
    },[]);

    return(
        <div>
            <h1> Mint</h1>
            <div> State:
                <button onClick={cbInit}>Mint</button>
                State: {state1}
            </div>
            <br/>
            {/* <div> List:
                <button onClick={cbList}>List</button>
                List:
            </div> */}
            List: {supply}
            <ul>
            { 
                Object.keys(nfts).map( (nft,index) => (
                        <li>index: {index} String: {nfts[index]}
                        </li>
                    ) )
            }
            </ul>
        </div>
    );
}