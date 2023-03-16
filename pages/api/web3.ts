import Web3 from 'web3'
import { NextApiRequest, NextApiResponse } from 'next'
import * as Fs from 'fs'

export default async (req: NextApiRequest , res: NextApiResponse) => {
    if (req.query.init != undefined) { return init1(req,res); }
}

let gW3wsock: any;

async function init1(req:NextApiRequest, res: NextApiResponse) {
    gW3wsock = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545'));
    gW3wsock.currentProvider.on("connect", async function () {
        let connectrst = "connnect success";

        let sca = '0x0e8D810881b4bCEd52C10c5Ceb0cd9176C962F19';
        let addr1 = '0xB4fb33522A2c6fCc63Bcec77A6b91aAd0A29cf69';
        let addr2 = '0xB4fb33522A2c6fCc63Bcec77A6b91aAd0A29cf69';
        let abidata = JSON.parse(Fs.readFileSync('public/web3sc.abi','utf8'));
        const sct1 = new gW3wsock.eth.Contract(abidata,sca,
            {from: addr1, gas: 1500000, gasPrice: '30000000000000'});
            //1,500,000; 30,000,000,000,000
        let balanceof1 = await sct1.methods['balanceOf'](addr2).call();
        let nftdata = await sct1.methods['addItem'](addr2,11,'kk11').send();
        let balanceof2 = await sct1.methods['balanceOf'](addr2).call();

        res.json({ connectrst, balanceof1, balanceof2, nftid:nftdata.events.Transfer.returnValues.tokenId,
        nftto:nftdata.events.Transfer.returnValues.to, nftfrom:nftdata.events.Transfer.returnValues.from});       
    });    
}