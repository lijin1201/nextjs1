
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
            <button onClick={async ()=>{

                gW3wsock.eth.defaultAccount = '0x652a9132F7517582a5998d22d5b9E2e1c3677035';
                let tContract = new gW3wsock.eth.Contract(
                    [
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "toAddr",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "itOpt",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "itName",
                                    "type": "string"
                                }
                            ],
                            "name": "addItem",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "string",
                                    "name": "name",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "symbol",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "nonpayable",
                            "type": "constructor"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "internalType": "address",
                                    "name": "owner",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "internalType": "address",
                                    "name": "approved",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "internalType": "uint256",
                                    "name": "tokenId",
                                    "type": "uint256"
                                }
                            ],
                            "name": "Approval",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "internalType": "address",
                                    "name": "owner",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "internalType": "address",
                                    "name": "operator",
                                    "type": "address"
                                },
                                {
                                    "indexed": false,
                                    "internalType": "bool",
                                    "name": "approved",
                                    "type": "bool"
                                }
                            ],
                            "name": "ApprovalForAll",
                            "type": "event"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "to",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "tokenId",
                                    "type": "uint256"
                                }
                            ],
                            "name": "approve",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "internalType": "address",
                                    "name": "addr",
                                    "type": "address"
                                },
                                {
                                    "indexed": false,
                                    "internalType": "uint256",
                                    "name": "tkid",
                                    "type": "uint256"
                                },
                                {
                                    "indexed": false,
                                    "internalType": "string",
                                    "name": "msg1",
                                    "type": "string"
                                }
                            ],
                            "name": "EvtLogTk",
                            "type": "event"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "from",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "to",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "tokenId",
                                    "type": "uint256"
                                }
                            ],
                            "name": "safeTransferFrom",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "from",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "to",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "tokenId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "data",
                                    "type": "bytes"
                                }
                            ],
                            "name": "safeTransferFrom",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "operator",
                                    "type": "address"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "approved",
                                    "type": "bool"
                                }
                            ],
                            "name": "setApprovalForAll",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "internalType": "address",
                                    "name": "from",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "internalType": "address",
                                    "name": "to",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "internalType": "uint256",
                                    "name": "tokenId",
                                    "type": "uint256"
                                }
                            ],
                            "name": "Transfer",
                            "type": "event"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "from",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "to",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "tokenId",
                                    "type": "uint256"
                                }
                            ],
                            "name": "transferFrom",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "owner",
                                    "type": "address"
                                }
                            ],
                            "name": "balanceOf",
                            "outputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "tokenId",
                                    "type": "uint256"
                                }
                            ],
                            "name": "getApproved",
                            "outputs": [
                                {
                                    "internalType": "address",
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "owner",
                                    "type": "address"
                                }
                            ],
                            "name": "getItemCount",
                            "outputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "itemid",
                                    "type": "uint256"
                                }
                            ],
                            "name": "getItemOwner",
                            "outputs": [
                                {
                                    "internalType": "address",
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "address",
                                    "name": "owner",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "operator",
                                    "type": "address"
                                }
                            ],
                            "name": "isApprovedForAll",
                            "outputs": [
                                {
                                    "internalType": "bool",
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "name": "mItems",
                            "outputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "mOpt",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "mName",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "name",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "tokenId",
                                    "type": "uint256"
                                }
                            ],
                            "name": "ownerOf",
                            "outputs": [
                                {
                                    "internalType": "address",
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "bytes4",
                                    "name": "interfaceId",
                                    "type": "bytes4"
                                }
                            ],
                            "name": "supportsInterface",
                            "outputs": [
                                {
                                    "internalType": "bool",
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "symbol",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "tokenId",
                                    "type": "uint256"
                                }
                            ],
                            "name": "tokenURI",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        }
                    ], '0xa5216Adb7Dc4e1CCFEaf5D39714B23967D6649E4'
                );
            
            //var tDetails = tContract.at(new1.address);
            //tContract.options.address = '0xa5216Adb7Dc4e1CCFEaf5D39714B23967D6649E4';
            //tContract.methods.addItem(gW3wsock.eth.getAccounts()[0],4,"item2").call().then(console.log);//.call({from:gW3wsock.eth.accounts[0]});
            //tContract.addItem(gW3wsock.eth.accounts[0],4,"item2");
            //gW3wsock.eth.getAccounts().then( (a) => {let addr0=a[0]; console.log(addr0);});
            
            //const accounts = await gW3wsock.eth.getAccounts();
            const addr0 = (await gW3wsock.eth.getAccounts())[0];
            tContract.methods.addItem('0x652a9132F7517582a5998d22d5b9E2e1c3677035',4,"item2").send({
                from: addr0,  gas: 1500000, gasPrice: '30000000000000'});
            }}>Trans</button>
            
        </div>
        )
};

//export default AppBC;

