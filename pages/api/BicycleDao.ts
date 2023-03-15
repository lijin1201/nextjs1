import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

async function connect(){
    const { MongoClient, ServerApiVersion} = require('mongodb');
    const uri = "mongodb://localhost:27017";
    const mgct = new MongoClient(uri);

    const db = mgct.db("ProjDb");
    const bAir = db.collection("BicycleAir");
    return bAir;
}

async function readAll(limit=50) {
    const bAir = await connect();
    const bAll = await bAir.find({}).limit(limit); 
    return await bAll.toArray();
}

async function searchAddr(addr:string) {
    const bAir = await connect();
    const data = await bAir.find({"설  치  위  치":{$regex: addr}});
    return await data.toArray();
}

async function favoriteSet(id:number) {
    const bAir = await connect();
    // const data1 = await bAir.findOne({"연번":id});
    //return await data1;
    //const result = await clc1.insertOne(data1);
    await bAir.updateOne({"연번":id},[{$set:{"favorite": {$not: "$favorite" } }  }]);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {addr,favorite} = req.query;
    console.log("usr get searchAddr : " + addr + " favorite : "+ favorite );
    // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.setHeader( 'Content-Type', 'text/html; charset=utf-8' );
    
    res.statusCode = StatusCodes.OK;

    if (addr) //{ return res.send("read code..."+read);}
    {return res.send(await searchAddr(String(addr)));}
    else if (favorite) {
        // return res.send("add favorite..." + add);
        await favoriteSet(Number(favorite));
    }
    else {
        //return res.send("list code...");
        let ar1 = await readAll();
    //    let sum1 = "bikeAirNum:" + String(ar1.length)+ ",";
        return res.send(JSON.stringify(ar1));
    }
}