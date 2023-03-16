import Web3 from 'web3'
import { NextApiRequest, NextApiResponse } from 'next'
import * as Fs from 'fs'

export default async (req: NextApiRequest , res: NextApiResponse) => {
    if (req.query.mint != undefined) { 
        return mint(req,res); 
    }
    if (req.query.list != undefined) { return list(req,res); }
    if (req.query.supply != undefined) { return supply(req,res); }
}

let gW3wsock: any;
let sca = '0xCeB7aB3d62e80Be6BC664a44F9C9b00A198Ab932';

async function mint(req:NextApiRequest, res: NextApiResponse) {
    gW3wsock = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545'));
    gW3wsock.currentProvider.on("connect", async function () {
        let connectrst = "connnect success";
        
        const accounts = await gW3wsock.eth.getAccounts();
        let addr1 = accounts[1];
        let addr2 = accounts[1];
        let abidata = JSON.parse(Fs.readFileSync('public/HkitNft.abi','utf8'));
        const sct1 = new gW3wsock.eth.Contract(abidata,sca,
            {from: addr1, gas: 1500000, gasPrice: '30000000000000'});
            //1,500,000; 30,000,000,000,000
        let balanceof1 = await sct1.methods['balanceOf'](addr2).call();
        let supply = await sct1.methods['supply']().call();
        let nftdata = await sct1.methods['addItem'](addr2,supply,'name'+supply,'URI1'+supply).send();
        let balanceof2 = await sct1.methods['balanceOf'](addr2).call();
        supply = await sct1.methods['supply']().call();
        res.json({ supply, connectrst, balanceof1, balanceof2, nftid:nftdata.events.Transfer.returnValues.tokenId,
        nftto:nftdata.events.Transfer.returnValues.to, nftfrom:nftdata.events.Transfer.returnValues.from});       
    });    
}

async function list(req:NextApiRequest, res: NextApiResponse) {
    const id = req.query.list;
    gW3wsock = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545'));
    gW3wsock.currentProvider.on("connect", async function () {
        let connectrst = "connnect success";
        
        //const accounts = await gW3wsock.eth.getAccounts();
        let abidata = JSON.parse(Fs.readFileSync('public/HkitNft.abi','utf8'));
        const sct1 = new gW3wsock.eth.Contract(abidata,sca);
            //1,500,000; 30,000,000,000,000
        const item = await sct1.methods['mItems'](id).call();
        //const itemData = new Map<number, string>();
        // itemList.map( (item) => {
        //     itemData.set();
        // });
        const owner = await sct1.methods['getItemOwner'](id).call();
        res.json({ id: id, data: item.mOpt + " " + item.mName+" "+
            owner
        });       
    });    
}

async function supply(req:NextApiRequest, res: NextApiResponse) {
    gW3wsock = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545'));
    gW3wsock.currentProvider.on("connect", async function () {
        let connectrst = "connnect success";
        
        const accounts = await gW3wsock.eth.getAccounts();
        let abidata = JSON.parse(Fs.readFileSync('public/HkitNft.abi','utf8'));
        const sct1 = new gW3wsock.eth.Contract(abidata,sca);
            //1,500,000; 30,000,000,000,000
        const supply = await sct1.methods['supply']().call();
        res.json({ supply
        });       
    });    
}