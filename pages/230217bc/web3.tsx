
import {useEffect, useState} from "react";
let gWeb3:any;
let gW3wsock:any;

//const  AppBC = () => {
export default function  AppBC ()  {

//    let msg1="first"; // do not change after the mgs1 assignment later
    const [msg1, setMsg1] = useState("first"); //var used for all elements
    console.log("init11");
    return (
        <div>
            <p>msg1:{msg1}</p>
            <button onClick= { (e)=> {
                gWeb3 = require("web3");
                console.log("init33");
                setMsg1("init");
            }}> Init </button>
            <button onClick= { (e)=> {
                gW3wsock = new gWeb3(new gWeb3.providers.WebsocketProvider('ws://localhost:7545'));
                gW3wsock.currentProvider.on("connect", ()=>{
                    setMsg1("gW3wsock connect success");
                })

            }}> Connect </button>
            <button onClick={()=>{
                let new1 = gW3wsock.eth.accounts.create();
                setMsg1("account addr:" + new1.address+" pk: "+ new1.privateKey);
            }}>Account</button>
        </div>
        )
};

//export default AppBC;

