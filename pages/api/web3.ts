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

        let sca = '0xa5216Adb7Dc4e1CCFEaf5D39714B23967D6649E4';
        let addr1 = '0x652a9132F7517582a5998d22d5b9E2e1c3677035';
        let addr2 = '0x652a9132F7517582a5998d22d5b9E2e1c3677035';
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