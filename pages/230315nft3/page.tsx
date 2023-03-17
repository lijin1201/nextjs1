//import { count } from "console";
import {useEffect, useState} from "react";

export default function App1() {
    const [state1, setState1] = useState("");
    const [keyids, setKeyids] = useState([]);
    const [nfts, setNfts] = useState(new Map());
    const [supply, setSupply] = useState(0);

  
    const cbList =  () => {
        console.log("nfts len1: "+ nfts);
        
        fetch('/api/nftApi?supply').then((rst) => rst.json()).then(rst=>{
            //if(nfts.length > 0) {return }
            console.log("nfts len2: "+ nfts.length);
            setSupply(rst.supply);
            const count = rst.supply;
            console.log("count First: "+ count);
       
            for (let i = 0; i < count ; i++) {
                console.log("i: "+i );
                //const contact = await contactList.methods.contacts(i).call();
                fetch('/api/nftApi?list='+i).then((rst) => rst.json()).then(rst=>{
                    console.log("id: "+rst.id +" " + rst.data);
                    //if(nfts 중복검사)
                    setNfts(map => new Map(map.set(rst.id, rst.data ) ) );
   
                });
                //setNfts({...nfts, ["key"+rst.id]:rst.data } );
                
            }
            
        });
    }

    const cbInit = () => {
        setState1("try mint");       
        fetch('/api/nftApi?mint='+cnt).then((rst) => rst.json()).then(rst=>{
            setState1("b1: " + rst.balanceof1 + "id: " + rst.nftid + "b2: " + rst.balanceof2);


        });
    };


    useEffect(() => {      
        cbList();
        } 
    ,[]);

    var myKeys = [];
    nfts.forEach((value, key) => myKeys.push(key));

    return(
        <div>
            <h1> Mint</h1>
            <div> State:
                <button onClick={cbInit}>Mint</button>
                State: {state1}
            </div>
            <br/>
           
            List: {supply}
            {/* Length: {nfts.length} */}
            <br/>
            {JSON.stringify(keyids)}
            <ul>
            {   
                // nfts.forEach( (value,key) =>  (<li>"value: " {value} </li>)) 

                myKeys.map((key) => (
                            <li>index: {key} String: {nfts.get(key)}
                            </li>
                        ) ) 
                // Object.keys(nfts).map( (nft,index) => (
                //         <li>index: {index} String: {nfts[index]}
                //         </li>
                //     ) )
            }
            </ul>
        </div>
    );
}