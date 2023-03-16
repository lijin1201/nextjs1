import Web3 from 'web3'
import { NextApiRequest, NextApiResponse } from 'next'
import * as Fs from 'fs'

export default async (req: NextApiRequest , res: NextApiResponse) => {
    if (req.query.mint != undefined) { 
        return mint(req,res); 
    }
    if (req.query.list != undefined) { return list(req,res); }
}

let gW3wsock: any;
let sca = '0xc7C7f3D831D08D77b8a1ce833343d76237f0a63f';

async function mint(req:NextApiRequest, res: NextApiResponse) {
    gW3wsock = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545'));
    gW3wsock.currentProvider.on("connect", async function () {
        let connectrst = "connnect success";
        
        const accounts = await gW3wsock.eth.getAccounts();
        let addr1 = accounts[0];
        let addr2 = accounts[0];
        let abidata = JSON.parse(Fs.readFileSync('public/HkitNft.abi','utf8'));
        const sct1 = new gW3wsock.eth.Contract(abidata,sca,
            {from: addr1, gas: 1500000, gasPrice: '30000000000000'});
            //1,500,000; 30,000,000,000,000
        let balanceof1 = await sct1.methods['balanceOf'](addr2).call();
        const i = req.query.mint;
        let nftdata = await sct1.methods['addItem'](addr2,i,'name'+i,'URI1'+i).send();
        let balanceof2 = await sct1.methods['balanceOf'](addr2).call();

        res.json({ connectrst, balanceof1, balanceof2, nftid:nftdata.events.Transfer.returnValues.tokenId,
        nftto:nftdata.events.Transfer.returnValues.to, nftfrom:nftdata.events.Transfer.returnValues.from});       
    });    
}

async function list(req:NextApiRequest, res: NextApiResponse) {
    gW3wsock = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545'));
    gW3wsock.currentProvider.on("connect", async function () {
        let connectrst = "connnect success";
        
        const accounts = await gW3wsock.eth.getAccounts();
        let addr1 = accounts[0];
        let addr2 = accounts[0];
        let abidata = JSON.parse(Fs.readFileSync('public/HkitNft.abi','utf8'));
        const sct1 = new gW3wsock.eth.Contract(abidata,sca);
            //1,500,000; 30,000,000,000,000
        const itemList = await sct1.methods['mItems'].call();
        const itemData = new Map<number, string>();
        itemList.map( (item) => {
            itemData.set(item.mOpt, item.mName+" "+
            sct1.methods['getItemOwner']().call());
        });

        res.json({ itemData});       
    });    
}